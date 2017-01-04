'use strict';

var applications = require('../controllers/applications.server.controller');

module.exports = function (app) {

    app.route('/api/applications')
        .post(applications.create)
        .get(applications.findAll);

    app.route('/api/applications/:applicationId')
        .get(applications.findOne)
        .delete(applications.delete);

    app.route('/api/applications/:applicationDSN/events')
        .post(applications.createEvent);

    app.param('applicationId', applications.applicationByID);
    app.param('applicationDSN', applications.applicationByDSN);
};
