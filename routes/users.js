const router = require("express").Router();
const User = require("../models/User.model");

const { removeByValue } = require("../utils");

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
  let updatedProfileIds = [];
  updatedProfileIds.push(user.person_no);

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

    for (const brother of newRelationships.brothers) {
      if (!oldRelationships.brothers.includes(brother)) {
        changesMade["addedBrothers"].push(brother);
      }
    }

    for (const brother of oldRelationships.brothers) {
      if (!newRelationships.brothers.includes(brother)) {
        changesMade["removedBrothers"].push(brother);
      }
    }

    for (const sister of newRelationships.sisters) {
      if (!oldRelationships.sisters.includes(sister)) {
        changesMade["addedSisters"].push(sister);
      }
    }

    for (const sister of oldRelationships.sisters) {
      if (!newRelationships.sisters.includes(sister)) {
        changesMade["removedSisters"].push(sister);
      }
    }

    for (const child of newRelationships.children) {
      if (!oldRelationships.children.includes(child)) {
        changesMade["addedChildren"].push(child);
      }
    }

    for (const child of oldRelationships.children) {
      if (!newRelationships.children.includes(child)) {
        changesMade["removedChildren"].push(child);
      }
    }

    if (changesMade["addedFather"]) {
      promises.push(
        User.updateOne(
          { person_no: changesMade["addedFather"] },
          { $addToSet: { "relationships.children": user.person_no } }
        ).exec()
      );
      updatedProfileIds.push(changesMade["addedFather"]);
    }

    if (changesMade["removedFather"]) {
      promises.push(
        User.updateOne(
          { person_no: changesMade["removedFather"] },
          { $pull: { "relationships.children": user.person_no } }
        ).exec()
      );
      updatedProfileIds.push(changesMade["removedFather"]);
    }

    if (changesMade["addedMother"]) {
      promises.push(
        User.updateOne(
          { person_no: changesMade["addedMother"] },
          { $addToSet: { "relationships.children": user.person_no } }
        ).exec()
      );
      updatedProfileIds.push(changesMade["addedMother"]);
    }

    if (changesMade["removedMother"]) {
      promises.push(
        User.updateOne(
          { person_no: changesMade["removedMother"] },
          { $pull: { "relationships.children": user.person_no } }
        ).exec()
      );
      updatedProfileIds.push(changesMade["removedMother"]);
    }

    for (const child of changesMade["addedChildren"]) {
      promises.push(
        User.updateOne(
          { person_no: child },
          {
            $set: {
              [`relationships.${iAmMale ? "father" : "mother"}`]: user.person_no,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["addedChildren"]);

    for (const child of changesMade["removedChildren"]) {
      promises.push(
        User.updateOne(
          { person_no: child },
          {
            $set: {
              [`relationships.${iAmMale ? "father" : "mother"}`]: null,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["removedChildren"]);

    for (const brother of changesMade["addedBrothers"]) {
      promises.push(
        User.updateOne(
          { person_no: brother },
          {
            $addToSet: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["addedBrothers"]);

    for (const brother of changesMade["removedBrothers"]) {
      promises.push(
        User.updateOne(
          { person_no: brother },
          {
            $pull: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["removedBrothers"]);

    for (const sister of changesMade["addedSisters"]) {
      promises.push(
        User.updateOne(
          { person_no: sister },
          {
            $addToSet: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["addedSisters"]);

    for (const sister of changesMade["removedSisters"]) {
      promises.push(
        User.updateOne(
          { person_no: sister },
          {
            $pull: {
              [`relationships.${iAmMale ? "brothers" : "sisters"}`]: user.person_no,
            },
          }
        ).exec()
      );
    }
    updatedProfileIds = updatedProfileIds.concat(changesMade["removedSisters"]);

    await Promise.all(promises);
    promises = [];

    /**
     * I have added bro/sis
     * All my bro/sis have me as their bro/sis
     *
     * What needs to be done?
     * 1) All my bro/sis ke siblings need to be my siblings
     * 2) I need to be a bro for all my siblings ke bro/sis
     */

    let [allTheBrothers, allTheSisters] = await User.find(
      {
        person_no: {
          $in: [...newRelationships.brothers, ...newRelationships.sisters],
        },
      },
      { relationships: 1 }
    ).then((users) => {
      let mySiblingsBrothers = [];
      let mySiblingsSisters = [];

      users.forEach((user) => {
        user = user.toObject();
        mySiblingsBrothers = mySiblingsBrothers.concat(user.relationships.brothers);
        mySiblingsSisters = mySiblingsSisters.concat(user.relationships.sisters);
      });

      return [mySiblingsBrothers, mySiblingsSisters];
    });

    allTheBrothers = allTheBrothers.concat(newRelationships.brothers);
    allTheBrothers = [...new Set(allTheBrothers)];

    allTheSisters = allTheSisters.concat(newRelationships.sisters);
    allTheSisters = [...new Set(allTheSisters)];

    promises.push(
      User.updateOne(
        { person_no: user.person_no },
        {
          $addToSet: {
            "relationships.brothers": {
              $each: iAmMale
                ? removeByValue(allTheBrothers, user.person_no)
                : allTheBrothers,
            },
            "relationships.sisters": {
              $each: iAmMale
                ? allTheSisters
                : removeByValue(allTheSisters, user.person_no),
            },
          },
        }
      )
    );

    for (const brother of allTheBrothers) {
      promises.push(
        User.updateOne(
          { person_no: brother },
          {
            $addToSet: {
              "relationships.brothers": {
                $each: removeByValue(allTheBrothers, brother),
              },
              "relationships.sisters": {
                $each: allTheSisters,
              },
            },
          }
        )
      );
    }

    for (const sister of allTheSisters) {
      promises.push(
        User.updateOne(
          { person_no: sister },
          {
            $addToSet: {
              "relationships.brothers": {
                $each: allTheBrothers,
              },
              "relationships.sisters": {
                $each: removeByValue(allTheSisters, sister),
              },
            },
          }
        )
      );
    }

    await Promise.all(promises);

    updatedProfileIds = updatedProfileIds.concat(allTheBrothers, allTheSisters);
    updatedProfileIds = [...new Set(updatedProfileIds)];

    const newValues = (
      await User.find({ person_no: { $in: updatedProfileIds } })
    ).map((user) => user.toObject());

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
