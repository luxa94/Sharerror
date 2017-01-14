'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

module.exports = function () {
    var app = express();

    // Add headers
    app.use(function (req, res, next) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', '*');
        res.setHeader('Access-Control-Allow-Headers', 'X-AUTH-TOKEN, Content-Type');
        next();
    });

    require('../modules/applications/server/models/application.server.model');
    require('../modules/events/server/models/event.server.model');
    require('../modules/users/server/models/user.server.model');
    require('../modules/comments/server/models/comment.server.model');

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    require('../modules/applications/server/routes/applications.server.routes')(app);
    require('../modules/users/server/routes/users.server.routes')(app);
    require('../modules/events/server/routes/event.server.routes')(app);
    require('../modules/comments/server/routes/comment.server.routes')(app);
    require('../config/errorHandler')(app);


    app.use(express.static('client'));
    app.use('/bower_components', express.static('bower_components'));

    return app;
};
