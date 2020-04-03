const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * activtiy model
 * id
 * title
 * description
 * url
 * Location
 * calendarId
 * userId
 * @type {mongoose}
 */
const ActivitySchema = new Schema({
  title: String,
  description: String,
  url: String,
  location: String,
  calendarId: { type: mongoose.Schema.Types.ObjectId, ref: "Calendar" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  to: { type: Date, default: new Date() },
  from: { type: Date, default: new Date() }
});

/**
 * define model activtiy
 * @type {[type]}
 */
const Activity = mongoose.model("Activity", ActivitySchema);

module.exports = Activity;
