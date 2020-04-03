const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * user model
 * id
 * username
 * password
 * @type {mongoose}
 */
const UserSchema = new Schema({
  username: String,
  password: String
});

/**
 * define model User
 * @type {[type]}
 */
const User = mongoose.model("User", UserSchema);

module.exports = User;
