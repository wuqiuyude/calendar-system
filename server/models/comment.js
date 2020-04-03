const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * comments model
 * @type {mongoose}
 */
const CommentSchema = new Schema({
  dateCreated: { type: Date, default: new Date() },
  dateModified: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  allText: String
});

/**
 * define model Comment
 * @type {[type]}
 */
const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
