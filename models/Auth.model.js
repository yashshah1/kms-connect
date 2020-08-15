const { Schema, model } = require("mongoose");

const authSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: true,
    required: true,
  },
});
const auth = model("auth", authSchema);

module.exports = auth;
