const { Schema, model } = require("mongoose");

const userSchema = new Schema({}, { strict: false });
const users = model("user", userSchema);

module.exports = users;
