const router = require("express").Router();
const User = require("../models/User.model");

router.get("/", async (req, res) => {
  try {
    let users = await User.find({}).exec();
    // users = users.slice(0, 20);
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching users" });
  }
});

router.post("/", async (req, res) => {
  const { user } = req.body;
  let promises = [];
  try {
    const oldUser = (
      await User.findOneAndUpdate(
        { person_no: parseInt(user.person_no) },
        user
      ).exec()
    ).toObject();

    const changesMade = {
      addedParents: [], // parents that the user has added
      removedParents: [], // parents that the user has removed
      addedChildren: [],
      removedChildren: [],
      addedSiblings: [],
      removedSiblings: [],
    };
    if (!oldUser.relationships) {
      changesMade["addedParents"] = user.relationships.parents;
      changesMade["addedChildren"] = user.relationships.children;
      changesMade["addedSiblings"] = user.relationships.siblings;
    } else {
      for (const parent of user.relationships.parents)
        if (!oldUser.relationships.parents.includes(parent))
          changesMade["addedParents"].push(parent);

      for (const parent of oldUser.relationships.parents)
        if (!user.relationships.parents.includes(parent))
          changesMade["removedParents"].push(parent);

      for (const sibling of user.relationships.siblings)
        if (!oldUser.relationships.siblings.includes(sibling))
          changesMade["addedSiblings"].push(sibling);

      for (const sibling of oldUser.relationships.siblings)
        if (!user.relationships.siblings.includes(sibling))
          changesMade["removedSiblings"].push(sibling);

      for (const child of user.relationships.children)
        if (!oldUser.relationships.children.includes(child))
          changesMade["addedChildren"].push(child);

      for (const child of oldUser.relationships.children)
        if (!user.relationships.children.includes(child))
          changesMade["removedChildren"].push(child);
    }

    for (const parent of changesMade.addedParents) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: parent },
          { $addToSet: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const parent of changesMade.removedParents) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: parent },
          { $pull: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const child of changesMade.addedChildren) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: child },
          { $addToSet: { "relationships.parents": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const child of changesMade.removedChildren) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: child },
          { $pull: { "relationships.parents": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const sibling of changesMade.addedSiblings) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: sibling },
          { $addToSet: { "relationships.siblings": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const sibling of changesMade.removedSiblings) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: sibling },
          { $pull: { "relationships.siblings": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    const newValues = (await Promise.all(promises)).map((user) => user.toObject());
    res.status(200).json(newValues);
  } catch (err) {
    console.log(err);
    res.status(400).json({ msg: "Error updating" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    let user = await User.findOne({ person_no: parseInt(userId, 10) }).exec();
    user = user.toObject();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching users" });
  }
});

module.exports = router;
