var createError = require('http-errors');
var express = require('express');
var cors=require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var productRouter = require('./routes/product');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(cors({
    origin:['http://localhost:8096'],  //指定接收的地址
    methods:['GET','POST'],  //指定接收的请求类型
    alloweHeaders:['Content-Type','Authorization']  //指定header
}))

app.use("*",(req,res,next)=>{
   // 允许任意源
   res.header('Access-Control-Allow-Origin',"*");
   // 允许的请求方法 修改请求头时会发送预检请求
   res.header('Access-Control-Allow-Methods','GET,POST,OPTIONS')
   // 允许自定义头部
   res.header('Shiyun-Session-Token',"tbxXKU6EpnX14Eqc2cQd");
   // 收到遇见请求返回成功状态
   if(req.method == 'OPTIONS'){
      res.send(200)
   }else{
      next();
   }
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/product', productRouter);
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
