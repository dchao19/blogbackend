var express = require('express');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var Account = require('./models/Account');
var routes = require('./routes/index');
var blogRoutes = require('./routes/blog');

var dbUser = process.env.DCHAO_BLOG_DB_USERNAME;
var dbPassword = process.env.DCHAO_BLOG_DB_PASSWORD;

var connectionUrl = 'mongodb://' + dbUser + ':' + dbPassword + '@ds019633.mlab.com:19633/heroku_611qwx4p';

mongoose.connect(connectionUrl);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log("Successfully connected to mongodb!");
});

passport.use(Account.createStrategy());
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/blog', blogRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;
