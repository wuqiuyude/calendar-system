const xss = require("xss");
const activityHelper = require("../dbhelper/activityHelper");
const tagUserHelper = require("../dbhelper/tagUserHelper");
const userHelper = require("../dbhelper/userHelper");

const MY_TAGGED_ACTIVITY_TYPE = 1;
const MY_CREATE_ACTIVITY_TYPE = 0;

/**
 * create new activtiy
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.createActivity = async (ctx, next) => {
  const title = ctx.request.body.title && xss(ctx.request.body.title.trim());
  const description = ctx.request.body.description && xss(ctx.request.body.description.trim());
  const url = ctx.request.body.url && xss(ctx.request.body.url.trim());
  const location = ctx.request.body.location && xss(ctx.request.body.location.trim());
  const to = ctx.request.body.to && xss(ctx.request.body.to.trim());
  const from = ctx.request.body.from && xss(ctx.request.body.from.trim());

  if (!title || !to || !from) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "title can not be empty"
    };
    return next;
  }
  try {
    const activity = await activityHelper.addActivity({
      title,
      description,
      url,
      location,
      userId: ctx.session.user._id,
      to,
      from
    });
    ctx.body = {
      code: 200,
      data: activity,
      msg: "create activity successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

/**
 * get activtiy list
 * @param {[string]} type          [activity type]
 * @yield {[type]}   [description]
 */
exports.getActivities = async (ctx, next) => {
  const type = Number(ctx.request.query.type || MY_CREATE_ACTIVITY_TYPE);
  console.log(type);
  try {
    let activity = [];
    if (type === MY_CREATE_ACTIVITY_TYPE) {
      activity = await activityHelper.findAllActivity({
        userId: ctx.session.user._id
      });
    }
    if (type === MY_TAGGED_ACTIVITY_TYPE) {
      activity = await activityHelper.findAllActivityByTaggedUserId({
        taggedUserId: ctx.session.user._id
      });
    }
    ctx.body = {
      code: 200,
      data: {
        list: activity,
        total: activity.length
      },
      msg: "get activity list successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

/**
 * get activtiy by id
 * @param {[string]} activityId          [activity type]
 * @yield {[type]}   [description]
 */
exports.getActivityById = async (ctx, next) => {
  const { activityId } = ctx.params;
  try {
    const activity = await activityHelper.findActivityAndUserById({ _id: activityId });
    if (!activity) {
      ctx.body = {
        code: 400,
        msg: "activity is not found"
      };
      return next;
    }
    ctx.body = {
      code: 200,
      data: activity,
      msg: "get activity successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};
/**
 * check Activity
 */

exports.hasActivity = async (ctx, next) => {
  const { activityId } = ctx.params;
  const activity = await activityHelper.findByActivityId({ _id: activityId });
  if (!activity) {
    ctx.body = {
      code: 400,
      msg: "activity is not found"
    };
    return next;
  }
  await next();
};

/**
 * update Activity
 */

exports.updateActivity = async (ctx, next) => {
  const { activityId } = ctx.params;
  const title = ctx.request.body.title && xss(ctx.request.body.title.trim());
  const description = ctx.request.body.description && xss(ctx.request.body.description.trim());
  const url = ctx.request.body.url && xss(ctx.request.body.url.trim());
  const location = ctx.request.body.location && xss(ctx.request.body.location.trim());
  if (!title) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "title can not be empty"
    };
    return next;
  }
  try {
    const activity = await activityHelper.findAndUpdateActivityById({ _id: activityId, title, description, url, location });
    ctx.body = {
      code: 200,
      data: activity,
      msg: "update activity successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

/**
 * update Activity
 */
exports.deleteActivity = async (ctx, next) => {
  const { activityId } = ctx.params;
  try {
    const activity = await activityHelper.deleteActivityById({ _id: activityId });
    ctx.body = {
      code: 200,
      data: activity,
      msg: "delete activity successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

/**
 * get tagged users
 */

exports.getTaggedUsers = async (ctx, next) => {
  const { activityId } = ctx.params;
  try {
    const tagUsers = await tagUserHelper.getTaggedUsersByActivityId({
      calendarActivityId: activityId
    });
    ctx.body = {
      code: 200,
      data: {
        list: tagUsers
      },
      msg: "get tagged users success"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

/**
 * add tag user
 */

exports.addTaggedUser = async (ctx, next) => {
  const { activityId } = ctx.params;
  const { taggedUsername } = ctx.request.body;
  const user = await userHelper.findByUsername({ username: taggedUsername });
  if (!user) {
    ctx.body = {
      code: 400,
      msg: `can not find ${taggedUsername}`
    };
    return next;
  }
  if (String(user._id) === String(ctx.session.user._id)) {
    ctx.body = {
      code: 400,
      msg: `can not tag yourself`
    };
    return next;
  }
  const taggedUser = await tagUserHelper.findByTagAndActivtiyId({ calendarActivityId: activityId, taggedUserId: user._id });
  if (taggedUser) {
    ctx.body = {
      code: 400,
      msg: `user has been tagged`
    };
    return next;
  }
  try {
    const tagUser = await tagUserHelper.addTagUser({
      calendarActivityId: activityId,
      taggedByUserId: ctx.session.user.id,
      taggedUserId: user._id,
      accepted: false
    });
    ctx.body = {
      code: 200,
      data: tagUser,
      msg: "add tag user successfully"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};

exports.updateTaggedUser = async (ctx, next) => {
  const { activityId, taggedUserId } = ctx.params;
  try {
    const tagUser = await tagUserHelper.findAndUpdate({
      calendarActivityId: activityId,
      taggedUserId,
      accepted: true
    });
    ctx.body = {
      code: 200,
      data: tagUser,
      msg: "accept tag user success"
    };
    return next;
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
    return next;
  }
};
