'use strict';

var applications = require('../controllers/applications.server.controller');

module.exports = function(app){

  app.route('/api/applications')
     .post(applications.create)
     .get(applications.findAll);

  app.route('/api/applications/:applicationId')
     .delete(applications.delete);

  app.route('/api/applications/:applicationId/events')
     .post(applications.createEvent);

  app.param('applicationId', applications.applicationByID);
}
