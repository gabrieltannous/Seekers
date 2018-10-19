var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
const cors = require('cors');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/database');
const helmet = require('helmet');
const Promise = require('bluebird');

var api = require('./routes/api');
var app = express();

//connect to database
mongoose.connect(config.database,{ useNewUrlParser: true }, function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + config.database);
  }
});

global.Promise = Promise;
app.use(helmet());
app.disable('x-powered-by');
app.set('trust proxy', 1); // trust first proxy
let corsOptions = {
  origin: 'http://localhost:4200', // Allow from localhost:1337
};
app.use(cors(corsOptions));
//init passport
app.use(passport.initialize());

//allow access from frontend
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.use("/",express.static(path.join(__dirname, 'dist')));

require('./config/passport')(passport);

app.use('/api', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
