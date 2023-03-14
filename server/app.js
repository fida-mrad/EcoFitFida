var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
// const session = require('express-session');
// require('dotenv').config();



var indexRouter = require('./routes/index');
var authRouter = require('./routes/auth.router');
var agentRouter = require('./routes/agent.router');
var adminRouter = require('./routes/admin.router');


const db = require("./config/dbconnection");
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const corsOptions ={
  origin:'http://localhost:3001',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/agent', agentRouter);
app.use('/admin', adminRouter);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

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
