const mongoose = require("mongoose");
const User = mongoose.model("User");
/**
 * find user by username
 * @param  {string} options.username
 * @return {Object}
 */
exports.findByUsername = async ({ username }) => {
  const query = User.findOne({ username });
  let res = null;
  const handler = (err, user) => {
    if (err) {
      res = {};
    } else {
      res = user;
    }
  };
  await query.exec(handler);
  return res;
};

/**
 * add user
 * @param  {[User]} user [mongoose.model('User')]
 * @return {[User]}      [mongoose.model('User')]
 */
exports.addUser = async user => {
  const newUser = await user.save();
  return newUser;
};
