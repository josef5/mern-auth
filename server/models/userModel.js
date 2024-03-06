const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Static signup method
userSchema.statics.register = async function (username, password) {
  // Check if username exists
  const existingUser = await this.findOne({ username });

  if (existingUser) {
    throw Error("Username already in use");
  }

  // Validation
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(username)) {
    throw Error("Email not valid");
  }

  /* if (!validator.isStrongPassword(password)) {
    throw Error("Password not strong enough");
  } */

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ username, password: hash });

  return user;
};

// Static login method
userSchema.statics.login = async function (username, password) {
  if (!username || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ username });

  if (!user) {
    throw Error("User does not exist");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw Error("Incorrect password");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
