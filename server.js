var express = require('express'),
    requireTree = require('require-tree'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    path = require('path'),
    routes = requireTree('./server/routes');

//db = require('./server/config/mongoose'),
app = express();

app
    .set('views', __dirname + '/server/views')
    .set('view engine', 'jade')

    .use(cookieParser())
    .use(bodyParser())
    .use(methodOverride())
    .use(session({secret: 'SECRET'}))
    .use(express.static('public'))
;
console.log(routes);
routes.home.map(app);

app.listen(8080, function () {
    console.log('server running on port 8080');
});