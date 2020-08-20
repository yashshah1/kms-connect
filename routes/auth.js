const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const jwtSecret = process.env.KMMMS_JWTSECRET;

const Auth = require("../models/Auth.model");
const User = require("../models/User.model");

const adminAuth = require("../middleware/adminAuth");

const {
  bcryptGenSaltPromise,
  bcryptHashPromise,
  bcryptComparePromise,
} = require("../utils");

router.post("/", adminAuth, async (req, res) => {
  const { username, password } = req.body;
  const user = await Auth.findOne({ username }).exec();
  if (user) {
    res.status(409).json({ msg: "User already exists" });
    return;
  }
  try {
    const user = await User.findOne({ person_no: parseInt(username) }).exec();
    if (!user) {
      res.status(400).json({ msg: "Invalid Username" });
      return;
    }
  } catch (err) {
    res.status(400).json({ msg: err.message });
    return;
  }
  try {
    const salt = await bcryptGenSaltPromise(10);
    const hash = await bcryptHashPromise(password, salt);
    const newUser = new Auth({
      username,
      password: hash,
      verified: true,
    });
    await newUser.save();
    res.status(200).json({ msg: "Created Successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.post("/all", adminAuth, async (req, res) => {
  const users = await User.find({}, { person_no: true });
  const salt = bcrypt.genSaltSync(10);
  const usersArray = [];

  users.forEach((user) => {
    user = user.toObject();
    const username = user.person_no.toString(10);
    const password = bcrypt.hashSync(username, salt);
    usersArray.push({ username, password });
    if (user.person_no % 10 === 0) console.log(username);
  });
  await Auth.insertMany(usersArray).exec();
  res.sendStatus(200);
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Auth.findOne({ username });
  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.verified)
    return res.status(404).json({ msg: "User not verified, contact admin" });

  try {
    const result = await bcryptComparePromise(password, user.password);
    if (!result) return res.status(401).json({ msg: "Invalid password" });

    let userData = await User.findOne({ person_no: parseInt(username) });
    userData = userData.toObject();

    jwt.sign({ username }, jwtSecret, { expiresIn: "1y" }, (err, token) => {
      if (err) throw err;
      res.status(200).send({
        msg: "Successfull",
        user: userData,
        token,
      });
    });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

router.post("/changePassword", async (req, res) => {
  const { username, oldPassword, newPassword } = req.body;
  const user = await Auth.findOne({ username }).exec();

  if (!user) return res.status(404).json({ msg: "User not found" });

  if (!user.verified)
    return res.status(404).json({ msg: "User not verified, contact admin" });

  try {
    const result = await bcryptComparePromise(oldPassword, user.password);
    if (!result) return res.status(401).json({ msg: "Incorrect password" });

    const salt = await bcryptGenSaltPromise(10);
    const hash = await bcryptHashPromise(newPassword, salt);

    await Auth.findOneAndUpdate({ username }, { password: hash }).exec();
    res.status(200).json({ msg: "Changed Successfully" });
  } catch (err) {
    return res.status(500).json({ msg: err });
  }
});

module.exports = router;
