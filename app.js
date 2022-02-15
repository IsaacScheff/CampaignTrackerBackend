var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const { db } = require('./models');

var app = express();

var corsOptions = {
  origin: 'http://frontend.campaigntracker.org',
  optionsSuccessStatus: 200, // For legacy browser support
  methods: "GET, PUT, POST, DELETE"
}

// app.use(cors(corsOptions));


var indexRouter = require('./api/index');
var usersRouter = require('./api/users');
var testAPIRouter = require("./api/testAPI");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

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


db.authenticate()
  .then(() => {
    console.log('Connected to the database!');
})


module.exports = app;
