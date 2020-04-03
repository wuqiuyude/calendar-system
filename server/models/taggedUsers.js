const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * TaggedUsers model
 * @type {mongoose}
 */
const TaggedUsersSchema = new Schema({
  taggedUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taggedByUserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  calendarActivityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  accepted: Boolean
});

/**
 * define model Comment
 * @type {[type]}
 */
const TaggedUsers = mongoose.model("TaggedUsers", TaggedUsersSchema);

module.exports = TaggedUsers;
