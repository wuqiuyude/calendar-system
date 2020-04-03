const calendarHelper = require("../dbhelper/calendarHelper");
const { getNextSequenceValue } = require("../dbhelper/index");

/**
 * create new calendar
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.createCalendar = async (ctx, next) => {
  const { startTime, endTime, location } = ctx.request.body;
  if (!location || !startTime || !endTime) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "name can not be empty"
    };
    return next;
  }
  try {
    const id = await getNextSequenceValue("calendar");
    const calendar = await calendarHelper.addCalendar({
      to: endTime,
      from: startTime,
      location,
      id,
      userId: ctx.session.user.id
    });
    ctx.body = {
      code: 200,
      data: calendar,
      msg: "get calendar list successfully"
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

exports.getCalendarList = async (ctx, next) => {
  try {
    const calendarList = await calendarHelper.findAllCalendar({
      userId: ctx.session.user.id
    });
    ctx.body = {
      code: 200,
      data: {
        list: calendarList
      },
      msg: "create calendar successfully"
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
