'use strict';

var applications = require('../controllers/applications.server.controller');

module.exports = function (app) {

    app.route('/api/applications')
        .post(applications.create)
        .get(applications.findAll);

    app.route('/api/applications/:applicationId')
        .get(applications.findOne)
        .delete(applications.delete);

    app.route('/api/applications/:applicationDNS/events')
        .post(applications.createEvent);

    app.param('applicationId', applications.applicationByID);
    app.param('applicationId', applications.applicationByDNS);
};
