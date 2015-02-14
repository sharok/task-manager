'use strict'

var express = require('express'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    path = require('path'),
    db = require('./server/config/mongoose'),
    passport = require('passport'),
    app = express();

app
    .use(cookieParser())
    .use(bodyParser())
    .use(methodOverride())
    .use(session({secret: 'SECRET'}))
    .use(express.static('public'))
    .use(passport.initialize())
    .use(passport.session());

app
    .set('views', __dirname + '/server/views')
    .set('view engine', 'jade');

db.init(path.join(__dirname, '/server/models'), function () {
});

require('./server/routes/routes.js')(app, passport);
require('./server/config/passport')(passport);

app.listen(8080, function () {
    console.log('server running on port 8080');
});