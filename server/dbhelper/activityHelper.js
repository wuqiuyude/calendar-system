const mongoose = require("mongoose");
const Activity = mongoose.model("Activity");
const TaggedUsers = mongoose.model("TaggedUsers");

const moment = require("moment");

/**
 * find Activity by id
 * @param  {string} options.username
 * @return {Object}
 */
exports.findByActivityId = async ({ id }) => {
  const query = Activity.findOne({ id });
  let res = null;
  const handler = (err, activities) => {
    if (!err) {
      res = activities;
    }
  };
  await query.exec(handler);
  return res;
};
/**
 * find Activity and user by id
 * @param  {string} options.username
 * @return {Object}
 */
exports.findActivityAndUserById = async ({ _id }) => {
  const query = Activity.findOne({ _id })
    .populate("userId", "username")
    .populate("calendarId");
  let res = null;
  const handler = (err, activities) => {
    if (!err) {
      res = activities;
    }
  };
  await query.exec(handler);
  if (res) {
    res = {
      startTime: moment(res.from).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(res.to).format("YYYY-MM-DD HH:mm:ss"),
      displayName: res.title || "",
      url: res.url,
      location: res.location,
      userId: res.userId,
      title: res.title,
      description: res.description,
      _id: res._id
    };
  }
  return res;
};

/**
 * @return {string}
 */
exports.findAllActivity = async param => {
  const query = Activity.find(param)
    .populate("userId", "username")
    .populate("calendarId");
  let res = [];
  const handler = (err, activityList) => {
    if (err) {
      res = [];
    } else {
      res = activityList;
    }
  };
  await query.exec(handler);
  const mapRes = [];
  res.forEach((item, index) => {
    // console.log(item);
    if (item.to && item.from) {
      mapRes.push({
        startTime: moment(item.from).format("YYYY-MM-DD HH:mm:ss"),
        endTime: moment(item.to).format("YYYY-MM-DD HH:mm:ss"),
        displayName: item.title || "",
        url: item.url,
        location: item.location,
        user: item.userId,
        userId: index,
        title: item.title,
        description: item.description,
        _id: item._id,
        id: index,
        type: 0
      });
    }
  });
  return mapRes;
};

/**
 * add activity
 * @param  {[Activity]} activity [mongoose.model('Activity')]
 * @return {[Activity]}      [mongoose.model('Activity')]
 */
exports.addActivity = async activityModal => {
  const newActivity = Activity(activityModal);
  const activityModel = await newActivity.save();
  return activityModel;
};

/**
 * update activity
 * @param  {[string]} _id  [activityId]
 * @return {[Activity]}      [mongoose.model('Activity')]
 */
exports.findAndUpdateActivityById = async ({ _id, url, description, title, location }) => {
  const res = await Activity.updateOne({ _id }, { url, description, title, location });
  console.log(res);
  return res;
};

/**
 * delete activity
 * @param  {[string]} _id  [activityId]
 * @return {[Activity]}      [mongoose.model('Activity')]
 */
exports.deleteActivityById = async ({ _id }) => {
  const res = await Activity.deleteOne({ _id });
  return res;
};

/**
 * find Activity and tagged user by id
 * @param  {string} options.taggedUserId
 * @return {Object}
 */
exports.findAllActivityByTaggedUserId = async ({ taggedUserId }) => {
  console.log(taggedUserId);
  const query = TaggedUsers.find({ taggedUserId })
    .populate("taggedUserId", "username")
    .populate("taggedByUserId", "username")
    .populate("calendarActivityId");
  let res = [];
  const handler = (err, activity) => {
    if (!err) {
      res = activity;
    }
  };
  await query.exec(handler);

  const mapRes = [];
  res.forEach((item, index) => {
    mapRes.push({
      accepted: item.accepted,
      user: item.taggedByUserId,
      userId: item.taggedByUserId._id + 1000,
      taggedByUserId: item.taggedByUserId,
      type: 1,
      startTime: moment(item.calendarActivityId.from).format("YYYY-MM-DD HH:mm:ss"),
      endTime: moment(item.calendarActivityId.to).format("YYYY-MM-DD HH:mm:ss"),
      displayName: item.calendarActivityId.title || "",
      url: item.calendarActivityId.url,
      location: item.calendarActivityId.location,
      title: item.calendarActivityId.title,
      description: item.description,
      _id: item.calendarActivityId._id,
      id: index + 10000
    });
  });
  return mapRes;
};
