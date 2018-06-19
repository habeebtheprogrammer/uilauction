// require("babel-core/register")
var express = require('express');

var path = require('path');
// var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var helmet = require('helmet');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var config = require('./config/config');
// var crypto = require('crypto');
var moment = require('moment');
var index = require('./routes/index');

var app = express();
mongoose.Promise = global.Promise
//cors
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
//helmet setup
app.use(helmet());  
app.disable('x-powered-by');
// view engine setup
app.set('views', path.join(__dirname, 'build'));
app.set('view engine', "html");

app.engine('html', require('hbs').__express);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'build')));


app.use('/', index);
app.get('*',function(req, res){
  res.sendFile(path.join(process.cwd(),"build/index.html"))
});

app.listen(process.env.PORT || 3006,()=>console.log("Server running on port 3006"));
module.exports = app;

  