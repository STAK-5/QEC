'use strict';
var express = require('express'),
    app = express(),
    path = require('path'),
    hogan = require('hogan-express'),
    cookieparse = require('cookie-parser'),
    session = require('express-session'),
    config = require('./config/config.js'),
    ConnectMongo = require('connect-mongo')(session),
    bodyparser = require('body-parser'),
    expressvalidator = require('express-validator'),
    mongoose = require('mongoose').connect(config.dbURL);


app.set('views', path.join(__dirname, 'views'));
app.engine('html', hogan);
app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieparse());
app.use(bodyparser.json()); // support json encoded bodies
app.use(bodyparser.urlencoded({extended: false})); // support encoded bodies
app.use(expressvalidator());


var MODE = process.env.NODE_ENV || 'development',
    PORT = process.env.PORT || 3301;
if (MODE == 'development') {
    //mongoose.connect('mongodb://localhost:27017');
    app.use(session({
        secret: config.sessionSecret,
        saveUninitialized: true,
        resave: true
    }))
} else {
    app.use(session({
        secret: config.sessionSecret,
        store: new ConnectMongo({
            mongoConnection: mongoose.connections[0],
            // url: config.dbURL,
            stringify: true
        }),
        saveUninitialized: true,
        resave: true
    }));
}
//require('./dbpack/mongodb.js')(mongoose);
require('./router/routes.js')(app, express, mongoose);


app.listen(3301, function () {
    console.log('express server on port - ', PORT);
    console.log('Development NODE_ENV: ', MODE);
});