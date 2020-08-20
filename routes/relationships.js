const router = require("express").Router();
const User = require("../models/User.model");

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
});

module.exports = router;
