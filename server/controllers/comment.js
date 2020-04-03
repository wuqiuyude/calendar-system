const xss = require("xss");
const CommentHelper = require("../dbhelper/commentHelper");

/**
 * create new Comment
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.createComment = async (ctx, next) => {
  const { activityId } = ctx.params;

  const allText = ctx.request.body.allText && xss(ctx.request.body.allText.trim());
  if (!activityId || !allText) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "name can not be empty"
    };
    return next;
  }
  try {
    const comment = await CommentHelper.addComment({
      allText,
      activityId,
      userId: ctx.session.user._id
    });
    ctx.body = {
      code: 200,
      data: comment,
      msg: "add comment successfully"
    };
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
  }
  return next;
};

exports.getActivityComments = async (ctx, next) => {
  const { activityId } = ctx.params;
  console.log(111, activityId);
  try {
    const commentList = await CommentHelper.findCommentsByActivityId({
      activityId
    });
    ctx.body = {
      code: 200,
      data: {
        list: commentList
      },
      msg: "get comment list successfully"
    };
  } catch (err) {
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
  }
  return next;
};

exports.findCommentByParamId = async (ctx, next) => {
  const { commentId } = ctx.params;
  const comment = await CommentHelper.findByCommentId({ id: commentId });
  if (!comment) {
    ctx.body = {
      code: 400,
      msg: "comment is not found"
    };
    return next;
  }
  await next();
  return next;
};

exports.findCommentById = async (ctx, next) => {
  const { commentId } = ctx.params;
  const comment = await CommentHelper.findByCommentId({ id: commentId });
  if (!comment) {
    ctx.body = {
      code: 400,
      msg: "comment is not found"
    };
    return next;
  }
  ctx.body = {
    code: 200,
    data: comment,
    msg: "get comment successfully"
  };
  return next;
};

exports.updateComment = async (ctx, next) => {
  const { commentId } = ctx.params;
  const allText = ctx.request.body.allText && xss(ctx.request.body.allText.trim());
  if (!allText) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "name can not be empty"
    };
    return next;
  }
  try {
    const comment = await CommentHelper.updateComment({
      allText,
      dateModified: new Date().toString(),
      id: commentId
    });
    ctx.body = {
      code: 200,
      data: comment,
      msg: "update comment successfully"
    };
  } catch (err) {
    console.log(err);
    ctx.body = {
      code: 400,
      data: "error",
      msg: err
    };
  }
  return next;
};
