const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * Calendar model
 * @type {mongoose}
 */
const CalendarSchema = new Schema({
  from: Date,
  to: Date,
  url: String,
  location: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

/**
 * define model Calendar
 * @type {[type]}
 */
const Calendar = mongoose.model("Calendar", CalendarSchema);

module.exports = Calendar;
