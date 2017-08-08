var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const flash = require('express-flash');
const session = require('express-session');

// Establishing connection to Mongodb
mongoose.connect('mongodb://localhost:27017/eventsManager',{useMongoClient:true});
let db = mongoose.connection;
// Db Connect Confirmation
db.once('open',()=>{
		console.log("Connected to MongoDB...");
});
// Db Error test
db.on('error',(err)=>{
	console.log(err);
})




// Bringing in route
var index = require('./routes/index');
var users = require('./routes/users');
var wedding = require('./routes/wedding');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Bringing express-session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

//Bringing express validator middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;
 
    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Bringing connect-flash middleware
// app.use(express.cookieParser('keyboard cat'));
// app.use(express.session({ cookie: { maxAge: 60000 }}));
// app.use(flash());

// Bringing Models
let Wedding = require('./models/wedding');

app.use('/', index);
app.use('/users', users);
app.use('/wedding',wedding);


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
