var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path');

module.exports = function() {
    var app = express();

    require('../modules/applications/server/models/application.server.model');
    require('../modules/events/server/models/event.server.model');
    require('../modules/users/server/models/user.server.model');

    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    require('../modules/applications/server/routes/applications.server.routes')(app);
    require('../modules/users/server/routes/users.server.routes')(app);

    require('../config/errorHandler')(app);

    return app;
};
