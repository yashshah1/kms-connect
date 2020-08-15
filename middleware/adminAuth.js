const adminAuth = (req, res, next) => {
  const adminHeader = req.headers["kmmms-admin"];
  if (adminHeader === "yashshah") next();
  else {
    res.status(401).json({ msg: "Not authorized to do this" });
    return;
  }
};

module.exports = adminAuth;
