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

/**
 * I'm A, I add B as a brother
 * My Brothers are C, D and E;
 * add B as a  bro for C D and E
 * add C D E as a bro for B
 */
/**
 * Make new collection for relationships
 */

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

    const iAmMale = user.gender === "Male";
    const { relationships: newRelationships } = user;
    const { relationships: oldRelationships } = oldUser;

    const changesMade = {
      addedFather: null,
      removedFather: null,
      addedMother: null,
      removedMother: null,
      addedBrothers: [],
      removedBrothers: [],
      addedSisters: [],
      removedSisters: [],
      addedChildren: [],
      removedChildren: [],
    };
    if (oldRelationships.father !== newRelationships.father) {
      changesMade["addedFather"] = newRelationships.father;
      changesMade["removedFather"] = oldRelationships.father;
    }

    if (oldRelationships.mother !== newRelationships.mother) {
      changesMade["addedMother"] = newRelationships.mother;
      changesMade["removedMother"] = oldRelationships.mother;
    }

    for (const brother of newRelationships.brothers)
      if (!oldRelationships.brothers.includes(brother))
        changesMade["addedBrothers"].push(brother);

    for (const brother of oldRelationships.brothers)
      if (!newRelationships.brothers.includes(brother))
        changesMade["removedBrothers"].push(brother);

    for (const sister of newRelationships.sisters)
      if (!oldRelationships.sisters.includes(sister))
        changesMade["addedSisters"].push(sister);

    for (const sister of oldRelationships.sisters)
      if (!newRelationships.sisters.includes(sister))
        changesMade["removedSisters"].push(sister);

    for (const child of newRelationships.children)
      if (!oldRelationships.children.includes(child))
        changesMade["addedChildren"].push(child);

    for (const child of oldRelationships.children)
      if (!newRelationships.children.includes(child))
        changesMade["removedChildren"].push(child);
    if (changesMade["addedFather"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: changesMade["addedFather"] },
          { $addToSet: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    if (changesMade["removedFather"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: changesMade["removedFather"] },
          { $pull: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    if (changesMade["addedMother"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: changesMade["addedMother"] },
          { $addToSet: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    if (changesMade["removedMother"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: changesMade["removedMother"] },
          { $pull: { "relationships.children": user.person_no } },
          { new: true }
        ).exec()
      );
    }

    for (const child of changesMade["addedChildren"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: child },
          {
            $set: {
              [`relationships.${iAmMale ? "father" : "mother"}`]: user.person_no,
            },
          },
          { new: true }
        ).exec()
      );
    }

    for (const child of changesMade["removedChildren"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: child },
          {
            $set: {
              [`relationships.${iAmMale ? "father" : "mother"}`]: null,
            },
          },
          { new: true }
        ).exec()
      );
    }

    for (const brother of changesMade["addedBrothers"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: brother },
          {
            $addToSet: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          },
          { new: true }
        ).exec()
      );
    }

    for (const brother of changesMade["removedBrothers"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: brother },
          {
            $pull: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          },
          { new: true }
        ).exec()
      );
    }

    for (const sister of changesMade["addedSisters"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: sister },
          {
            $addToSet: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          },
          { new: true }
        ).exec()
      );
    }

    for (const sister of changesMade["removedSisters"]) {
      promises.push(
        User.findOneAndUpdate(
          { person_no: sister },
          {
            $pull: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          },
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
