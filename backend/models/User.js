const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      require: true,
      min: 6,
      max: 20,
      unique: true,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    firstname: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    lastname: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    phone: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    location: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 6,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
