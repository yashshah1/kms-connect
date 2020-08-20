const jwt = require("jsonwebtoken");
const jwtSecret = process.env.KMMMS_JWTSECRET;

const auth = (req, res, next) => {
  const userHeader = req.headers["kmmms-user"];
  try {
    jwt.verify(userHeader, jwtSecret, (err, decoded) => {
      if (err) throw err;
      req.username = decoded.username;
      next();
    });
  } catch (err) {
    res.status(401).json({ msg: "Not authorized to do this" });
    return;
  }
};

module.exports = auth;
