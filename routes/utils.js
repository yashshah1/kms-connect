const router = require("express").Router();
const User = require("../models/User.model");

// currently unused
router.get("/distinct/:field", async (req, res) => {
  const { field } = req.params;
  try {
    const result = await User.distinct(field);
    if (result.length !== 0) res.status(200).json(result);
    else throw "";
  } catch (err) {
    res.status(404).json({ msg: "Invalid Column name" });
  }
});

module.exports = router;
