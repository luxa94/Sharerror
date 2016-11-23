'use strict';

var events = require('../controllers/events.server.controller.js')
var applications = require('../controllers/applications.server.controller.js')

module.exports = function(app){

  app.route('/api/events/application/:applicationId')
     .post(events.create);

  app.param('applicationId', applications.applicationByID);
}
