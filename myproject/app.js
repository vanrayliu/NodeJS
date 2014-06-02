var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var ejs = require('ejs') ; 

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));

app.engine('html',ejs.__express) ;
app.set('view engine', 'html'); // 替换：app.set('view engine', 'ejs');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));




//app.get('/', routes);
app.use('/users', users);

app.get('/', routes.index);
app.get('/login', routes.login); // 此处还需要routes/index.js修改
app.post('/login', routes.doLogin);   // 处理post请求，表单提交
app.get('/logout', routes.logout);      // 处理注销
app.get('/welcome', routes.welcome);                 // 进入到首页

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
 