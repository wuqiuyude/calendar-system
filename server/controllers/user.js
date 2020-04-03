const xss = require("xss");
const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const User = mongoose.model("User");
const userHelper = require("../dbhelper/userHelper");
const { getNextSequenceValue } = require("../dbhelper/index");

const SECRET = "hello world";

/**
 * register new user
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.signup = async (ctx, next) => {
  const username = xss(ctx.request.body.username.trim());
  const password = xss(ctx.request.body.password.trim());
  const confirm = xss(ctx.request.body.confirm.trim());
  if (!username || !password || !confirm) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "username or password can not be empty"
    };
    return next;
  }
  if (password !== confirm) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "both the input passwords must be consistent"
    };
    return next;
  }
  let user = await userHelper.findByUsername({
    username
  });
  if (!user) {
    const id = await getNextSequenceValue("user");
    const newUser = new User({
      username,
      password
    });
    try {
      user = await userHelper.addUser(newUser);
      const payload = {
        user: user.username,
        time: new Date().getTime(),
        timeout: 1000 * 60 * 60 * 2
      };
      const token = jwt.sign(payload, SECRET);
      ctx.body = {
        code: 200,
        data: {
          user,
          token
        },
        msg: "success"
      };
    } catch (e) {
      ctx.body = {
        code: 400,
        data: "error",
        msg: e
      };
    }
  } else {
    ctx.body = {
      code: 400,
      data: "",
      msg: "username has been used"
    };
  }
};

/**
 * login
 * @param {Function} next          [description]
 * @yield {[type]}   [description]
 */
exports.login = async (ctx, next) => {
  const username = xss(ctx.request.body.username.trim());
  const password = xss(ctx.request.body.password.trim());
  if (!username || !password) {
    ctx.body = {
      code: 400,
      data: "param error",
      msg: "username or password can not be empty"
    };
  }
  const user = await userHelper.findByUsername({
    username
  });
  if (!user) {
    ctx.bdy = {
      code: 400,
      msg: "can not find the user， please sign up"
    };
    next();
  } else {
    const payload = {
      user: user.username,
      time: new Date().getTime(),
      timeout: 1000 * 60 * 60 * 2
    };
    const token = jwt.sign(payload, SECRET);
    ctx.body = {
      code: 200,
      data: {
        user,
        token
      },
      msg: "login success"
    };
  }
};

/**
 *
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.users = async (ctx, next) => {
  const data = await userHelper.findAllUsers();
  ctx.body = {
    success: true,
    data
  };
  next();
};
