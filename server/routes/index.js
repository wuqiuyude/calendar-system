const Router = require("koa-router");
const User = require("../controllers/user");
const App = require("../controllers/app");
const Activity = require("../controllers/activity");
const Calendar = require("../controllers/calendar");
const Comment = require("../controllers/comment");

module.exports = function() {
  const router = new Router({
    prefix: "/api"
  });

  // user
  router.post("/user/signup", App.hasBody, User.signup);
  router.post("/user/login", App.hasBody, User.login);
  router.post("/activities", App.hasBody, App.hasToken, Activity.createActivity);
  router.get("/activity/:activityId", App.hasToken, Activity.hasActivity, Activity.getActivityById);
  router.put("/activity/:activityId", App.hasBody, App.hasToken, Activity.hasActivity, Activity.updateActivity);
  router.get("/activities", App.hasToken, Activity.getActivities);
  router.post("/activities", App.hasBody, App.hasToken, Activity.createActivity);
  router.delete("/activity/:activityId", App.hasToken, Activity.hasActivity, Activity.deleteActivity);
  router.get("/activity/:activityId", App.hasToken, Activity.hasActivity, Activity.getActivityById);
  router.post("/calendar/create", App.hasBody, App.hasToken, Calendar.createCalendar);
  router.get("/calendars", App.hasToken, Calendar.getCalendarList);
  router.post("/activity/:activityId/comments", App.hasBody, App.hasToken, Activity.hasActivity, Comment.createComment);
  router.put("/comment/:commentId", App.hasBody, App.hasToken, Comment.findCommentByParamId, Comment.updateComment);
  router.get("/comment/:commentId", App.hasBody, App.hasToken, Comment.findCommentById);
  // router.delete("/comment/:commentId", App.hasBody, App.hasToken, Comment.findCommentByParamId, Comment.deleteComment);
  router.get("/activity/:activityId/comments", App.hasToken, Activity.hasActivity, Comment.getActivityComments);
  router.post("/activity/:activityId/tagged_users", App.hasBody, App.hasToken, Activity.hasActivity, Activity.addTaggedUser);
  router.get("/activity/:activityId/tagged_users", App.hasToken, Activity.hasActivity, Activity.getTaggedUsers);
  router.put("/activity/:activityId/tagged_user/:taggedUserId", App.hasBody, App.hasToken, Activity.hasActivity, Activity.updateTaggedUser);
  router.post("/upload/image", App.upload.single("file"), App.UploadImg);

  return router;
};
