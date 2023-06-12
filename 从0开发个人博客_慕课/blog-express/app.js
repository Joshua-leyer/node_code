var createError = require('http-errors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var express = require('express');
const session = require('express-session');
const RedisStore = require('connect-redis').default;
const { createClient } = require("redis")


const blogRouter = require('./routes/blog');
const userRouter = require('./routes/user');
var app = express();



const ENV = process.env.NODE_ENV;
// 日志功能
app.use(logger('dev'));

app.use(express.json());   // application/json
app.use(express.urlencoded({ extended: false }));  // application/x-www-form-urlencoded

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let redisClient = createClient()
redisClient.connect().catch(console.error)

// let redisClient = require('./db/redis');  //不知道为什么，改成引用另外一个文件就会出错
const sessionStore = new RedisStore({
  client: redisClient
});

app.use(session({
  secret: 'JOSHUA', // 密匙
  cookie: {
    // path: '/', // 默认配置
    // httpOnly: true,  // 默认配置 
    maxAge: 24 * 60 * 60 * 1000 // 24小时失效
  },
  store: sessionStore,
  saveUninitialized: false // recommended: only save session when data exists
}))

app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
