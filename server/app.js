var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors')

var index = require('./routes/index');
var api = require("./routes/api");

var webpackDevMiddleware = require("webpack-dev-middleware");
var webpack = require("webpack");
var webpackConfig = require("../webpack.config.dev");

var compression = require('compression');

var app = express();
app.use(cors());

if (process.env.NODE_ENV == "development"){
  var compiler = webpack(webpackConfig);

  app.use(webpackDevMiddleware(compiler, {
     publicPath: "/dist" // Same as `output.publicPath` in most cases.
  }))
}

// Use gzip compression to responses
app.use(compression());

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', index);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use('/api', api);

// Share PouchDB musicDB by Http
app.use('/db', require('express-pouchdb')(require('./models/db/musicDB').PouchDB));


// envía el index.html para la SPA.
app.get('*', (req, res, next) => {  
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
  } else {
    next()
  }
})


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
  //res.render('error');
  next(err);
});

// Add Capitalize method to String
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

module.exports = app;
