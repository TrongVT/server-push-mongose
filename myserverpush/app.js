var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Configuring the database
var mongoose = require('mongoose');
mongoose.connect('mongodb://trongkira:Doimat1102@ds119268.mlab.com:19268/tokens_table');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connect successful");
});


app.get('/', function(req, res){
  res.json({"message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes."});
});
// Require Notes routes
//require('./routes/note.routes.js')(app);
require('./routes/token.routes.js')(app);
require('./routes/push.route.js')(app);
module.exports = app;
app.listen('2702',function(){
	console.log('Example app listening on port 2702 !');
})
