const mongoose = require("mongoose");
const TaggedUsers = mongoose.model("TaggedUsers");
/**
 * find tag by taggedUserId
 * @param  {string} options.username
 * @return {Object}
 */
exports.findAllByTaggedUserId = async ({ taggedUserId }) => {
  const query = TaggedUsers.findAll({ taggedUserId });
  let res = null;
  const handler = (err, tag) => {
    if (err) {
      res = [];
    } else {
      res = tag;
    }
  };
  await query.exec(handler);
  return res;
};

/**
 * add tag
 * @param  {[tag]} tag [mongoose.model('tag')]
 * @return {[tag]}      [mongoose.model('tag')]
 */
exports.addTagUser = async tag => {
  const newTag = TaggedUsers(tag);
  const newtagobj = await newTag.save();
  return newtagobj;
};

exports.findAndUpdate = async ({ calendarActivityId, taggedUserId, accepted }) => {
  const res = await TaggedUsers.update({ calendarActivityId, taggedUserId }, { accepted });
  return res;
};

exports.getTaggedUsersByActivityId = async ({ calendarActivityId }) => {
  const query = TaggedUsers.find({ calendarActivityId })
    .populate("taggedUserId", "username")
    .populate("taggedByUserId", "username");
  let res = null;
  const handler = (err, tag) => {
    if (err) {
      res = [];
    } else {
      res = tag;
    }
  };
  await query.exec(handler);
  return res;
};

exports.findByTagAndActivtiyId = async ({ calendarActivityId, taggedUserId }) => {
  const query = TaggedUsers.findOne({ calendarActivityId, taggedUserId });
  let res = null;
  const handler = (err, user) => {
    if (err) {
      res = null;
    } else {
      res = user;
    }
  };
  await query.exec(handler);
  return res;
};
