var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');

/**
 * Database configuration
 */
var db = require('knex')({
    client: 'mysql',
    connection: {
        host     : '',
        user     : 'kataynoi',
        password : '',
        database : 'hdc',
        port: 3306
    },
    pool: {
        min: 0,
        max: 100
    }
});

var db_hhc= require('knex')({
    client: 'mysql',
    connection: {
        host     : '203.157.185.18',
        user     : 'kataynoi',
        password : 'kataynoi180834145007',
        database : 'hdc_hhc',
        port: 3306
    },
    pool: {
        min: 0,
        max: 100
    }
});


 // Localhost
/*var db = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'sa',
        password : 'sa',
        database : 'hdc',
        port: 3306
    },
    pool: {
        min: 0,
        max: 100
    }
});

var db_hhc= require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'sa',
        password : 'sa',
        database : 'hdc_hhc',
        port: 3306
    },
    pool: {
        min: 0,
        max: 100
    }
});*/

/**
 * Routing
 */
var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

//app.listen(3001);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use(session({
    secret: 'MySeCrETkEy',
    resave: false,
    saveUninitialized: true,
    secure: true
}));

/**
 * Database binding
 */
app.use(function (req, res, next) {
    req.db = db;
    req.db_hhc = db_hhc;
    next();
});
/**
 * Load routing
 */
app.use(routes);
app.use(users);

/**
 * Check user logged in
 */
var auth = function (req, res, next) {
    if (req.session.username) {
        next();
    } else {
        res.redirect('/auth_failed');
    }
};

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