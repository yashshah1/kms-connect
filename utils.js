const bcrypt = require("bcryptjs");

const bcryptGenSaltPromise = (numberOfRounds = 10) => {
  if (typeof numberOfRounds !== "number") {
    return Promise.reject("numberOfRounds should be a number");
  }
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(numberOfRounds, (err, salt) => {
      if (err) reject(err);
      resolve(salt);
    });
  });
};

const bcryptHashPromise = (password, salt) => {
  if (!password || !salt) return Promise.reject("Both parameters are required");
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      if (err) reject(err);
      resolve(hash);
    });
  });
};

const bcryptComparePromise = (password, hash) => {
  if (!password || !hash) return Promise.reject("Both parameters are required");
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

const removeByValue = (array, value, count = 1) => {
  const newArray = [...array];
  if (newArray.indexOf(value) !== -1) {
    newArray.splice(newArray.indexOf(value), count);
  }
  return newArray;
};

module.exports = {
  bcryptComparePromise,
  bcryptHashPromise,
  bcryptGenSaltPromise,
  removeByValue,
};
