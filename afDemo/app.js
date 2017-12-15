var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sassMiddleware = require('node-sass-middleware');

/*var index = require('./routes/index');
var users = require('./routes/users');*/

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
    src: path.join(__dirname, 'public/stylesheets/scss'),
    dest: path.join(__dirname, 'public/stylesheets'),
    debug: true,
    indentedSyntax: false,
    outputStyle: process.env.NODE_ENV === 'dev' ? 'extended' : 'compressed',
    prefix:  '/stylesheets',
    log: function (severity, key, value) { console.log(severity, 'node-sass-middleware   %s : %s', key, value); }
}));

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send(404, 'Page not found');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
