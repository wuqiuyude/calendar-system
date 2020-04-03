const mongoose = require("mongoose");
const moment = require("moment");

const Comment = mongoose.model("Comment");

/**
 * find Comments by activity id
 * @param  {string} options.activityId
 * @return {Object}
 */
exports.findCommentsByActivityId = async ({ activityId }) => {
  console.log(activityId);
  const query = Comment.find({ activityId }).populate("userId");
  let res = null;
  const handler = (err, comment) => {
    if (err) {
      res = [];
    } else {
      res = comment;
    }
  };
  await query.exec(handler);
  if (res.length)
    return res.map(item => {
      return {
        allText: item.allText,
        activityId: item.activityId,
        userId: item.userId,
        dateCreated: moment(item.dateCreated).format("YYYY-MM-DD HH:mm:ss"),
        dateModified: (item.dateModified && moment(item.dateModified).format("YYYY-MM-DD HH:mm:ss")) || ""
      };
    });

  return [];
};

/**
 * add Comment
 * @param  {[Comment]} Comment [mongoose.model('Comment')]
 * @return {[Comment]}      [mongoose.model('Comment')]
 */
exports.addComment = async comment => {
  const newComment = Comment(comment);
  let res = await newComment.save();
  if (res._id) {
    res = {
      allText: res.allText,
      activityId: res.activityId,
      userId: res.userId,
      dateCreated: moment(res.dateCreated).format("YYYY-MM-DD HH:mm:ss"),
      dateModified: (res.dateModified && moment(res.dateModified).format("YYYY-MM-DD HH:mm:ss")) || ""
    };
  }
  return res;
};

/**
 * update Comment
 */
exports.updateComment = async ({ _id, allText, dateModified }) => {
  const res = await Comment.updateOne({ _id }, { allText, dateModified });
  return res;
};

/**
 * find comment by _id
 */

exports.findByCommentId = async ({ _id }) => {
  const query = Comment.findOne({ _id });
  let res = null;
  const handler = (err, comment) => {
    if (err) {
      res = null;
    } else {
      res = comment;
    }
  };
  await query.exec(handler);
  if (res) {
    res = {
      allText: res.allText,
      id: res.id,
      activityId: res.activityId,
      userId: res.userId,
      dateCreated: moment(res.dateCreated).format("YYYY-MM-DD HH:mm:ss"),
      dateModified: (res.dateModified && moment(res.dateModified).format("YYYY-MM-DD HH:mm:ss")) || ""
    };
  }
  return res;
};

/**
 * get activity Comment count
 */
exports.getCommentsCount = async ({ activityId }) => {
  const query = await Comment.where({ activityId }).count();
  let res = null;
  const handler = (err, comment) => {
    if (err) {
      res = null;
    } else {
      res = comment;
    }
  };
  await query.exec(handler);
  return res;
};
