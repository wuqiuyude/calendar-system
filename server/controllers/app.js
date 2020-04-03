// controllers functions

const mongoose = require("mongoose");
const path = require("path");
const jwt = require("jsonwebtoken");
const multer = require("koa-multer");

const User = mongoose.model("User");

const SECRET = "hello world";

exports.hasBody = async (ctx, next) => {
  const body = ctx.request.body || {};

  if (Object.keys(body).length === 0) {
    ctx.body = {
      code: 400,
      msg: "param error"
    };

    return next;
  }
  await next();
  return next;
};

// check token
exports.hasToken = async (ctx, next) => {
  const accessToken = ctx.headers["access-token"];

  if (!accessToken) {
    ctx.body = {
      code: 401,
      msg: "please login"
    };

    return next;
  }
  await jwt.verify(accessToken, SECRET, async function(err, decode) {
    if (err) {
      ctx.body = {
        code: 401,
        msg: "token is expired"
      };
      return next;
    }
    const user = await User.findOne({
      username: decode.user
    }).exec();
    if (!user) {
      ctx.body = {
        success: false,
        err: "用户没登陆"
      };

      return next;
    }
    ctx.session = ctx.session || {};
    ctx.session.user = user;
    return next;
  });
  await next();
};

const storage = multer.diskStorage({
  // dir to save img
  destination(req, file, cb) {
    cb(null, path.resolve(__dirname, "../imgs"));
  },
  // modify filename
  filename(req, file, cb) {
    const fileFormat = file.originalname.split(".");
    cb(null, `${Date.now()}.${fileFormat[fileFormat.length - 1]}`);
  }
});

exports.upload = multer({ storage });

/**
 *
 * @param  {[type]}   ctx  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.UploadImg = async (ctx, next) => {
  ctx.body = {
    code: 200,
    data: `http://localhost:1234/${ctx.req.file.filename}`,
    msg: "upload img sccuess"
  };
};
