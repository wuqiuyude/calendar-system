const mongoose = require("mongoose");
const Calendar = mongoose.model("Calendar");
const moment = require("moment");

/**
 * find calendar by id
 * @param  {string} options.username
 * @return {Object}
 */
exports.findBycalendar = async ({ id }) => {
  const query = Calendar.findOne({ id });
  let res = null;
  const handler = (err, calendar) => {
    if (err) {
      res = {};
    } else {
      res = calendar;
    }
  };
  await query.exec(handler);
  if (res.id) {
    res = {
      startTime: moment(res.from).format("YYYY-MM-DD"),
      endTime: moment(res.to).format("YYYY-MM-DD"),
      displayName: res.location || "",
      id: res.id,
      userId: res.userId
    };
  }
  return res;
};

/**
 * @return {string}
 */
exports.findAllCalendar = async ({ userId }) => {
  const query = Calendar.find({ userId });
  let res = [];
  const handler = (err, calendar) => {
    if (err) {
      res = [];
    } else {
      res = calendar;
    }
  };
  await query.exec(handler);
  const mapRes = [];
  res.forEach(item => {
    if (item.to && item.from && item.location) {
      mapRes.push({
        startTime: moment(item.from).format("YYYY-MM-DD"),
        endTime: moment(item.to).format("YYYY-MM-DD"),
        displayName: item.location || "",
        _id: item._id,
        userId: item.userId
      });
    }
  });
  return mapRes;
};

/**
 * add Calendar
 * @param  {[Calendar]} Calendar [mongoose.model('Calendar')]
 * @return {[Calendar]}      [mongoose.model('Calendar')]
 */
exports.addCalendar = async calendar => {
  const newCalendar = Calendar(calendar);
  let res = await newCalendar.save();
  if (res.id) {
    res = {
      startTime: moment(res.from).format("YYYY-MM-DD"),
      endTime: moment(res.to).format("YYYY-MM-DD"),
      displayName: res.location || "",
      id: res.id,
      userId: res.userId
    };
  }
  return res;
};
