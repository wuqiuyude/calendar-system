const fs = require("fs");
const serve = require("koa-static");
const path = require("path");
const mongoose = require("mongoose");
const babelRegister = require("babel-register");
const Koa = require("koa");
const logger = require("koa-logger");
const session = require("koa-session");
const bodyParser = require("koa-bodyparser");
const db = "mongodb://localhost/test";

/**
 * mongoose connect
 * @type {[type]}
 */
mongoose.Promise = require("bluebird");
mongoose.connect(db, { useMongoClient: true });

/**
 * path
 * @type {[type]}
 */
const modelsPath = path.join(__dirname, "models");

/**
 * read modeld require
 * @param  {[type]} modelPath [description]
 * @return {[type]}           [description]
 */
const walk = function(modelPath) {
  fs.readdirSync(modelPath).forEach(function(file) {
    const filePath = path.join(modelPath, `/${file}`);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      if (/(.*)\.(js|coffee)/.test(file)) {
        require(filePath);
      }
    } else if (stat.isDirectory()) {
      walk(filePath);
    }
  });
};
walk(modelsPath);

const app = new Koa();

app.keys = ["project3"];
app.use(logger());
app.use(session(app));
app.use(bodyParser());

/**
 * 使用路由转发请求
 * @type {[type]}
 */
const router = require("./routes/index")();

app
  .use(serve(path.join(__dirname, "./imgs")))
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(1234);
console.log("app started at port 1234...");
