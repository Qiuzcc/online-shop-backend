var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Database connection
mongoose.connect(`mongodb://localhost:27017/vue-online-shop-test`);
console.log('数据库连接','mongoDB连接成功');

//CORS，允许跨域资源访问
app.all('/*',function(req,res,next){
  //CORS headers
  res.header('Access-Control-Allow-Origin','*');
  res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIOS');
  //set custom headers for CORS
  res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-Key');
  if(req.method == 'OPTIONS'){
    res.status(200).end();
  }else{
    next();
  }
})
// 通常意义上，上面的代码存在很多问题，我们一般意义上会使用 NPM 包 cors 来解决，当然我们这里使用了比较简单粗暴的方式

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/v1',api);

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
