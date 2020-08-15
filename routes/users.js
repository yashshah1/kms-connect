const router = require("express").Router();
const User = require("../models/User.model");

const auth = require("../middleware/auth");

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
  try {
    const doc = await User.findOneAndUpdate(
      { person_no: parseInt(user.person_no) },
      user,
      { new: true }
    );
    res.status(200).json({ user: doc.toObject() });
  } catch (err) {
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
