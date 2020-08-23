const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = (
      await User.findOne({ person_no: parseInt(userId, 10) })
        .select("relationships")
        .exec()
    ).toObject();
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ msg: "Error fetching users" });
  }
});

module.exports = router;
