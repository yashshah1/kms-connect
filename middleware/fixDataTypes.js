const { dataTypeMapper } = require("../utils");

const mapper = (req, res, next) => {
  const user = JSON.parse(JSON.stringify(req.body));
  const keys = Object.keys(dataTypeMapper);

  for (const key of Object.keys(user)) {
    const value = user[key];
    if (value === "null") {
      user[key] = null;
    } else if (keys.includes(key)) {
      user[key] = dataTypeMapper[key](value);
    }
  }
  req.body = user;
  next();
};

module.exports = mapper;
