const mongoose = require("mongoose");

const passwordSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  optional: {
    type: String,
  },
});

const Password = mongoose.model("Password", passwordSchema);

module.exports = Password;
