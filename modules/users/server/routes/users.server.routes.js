'use strict';

var users = require('../controllers/users.server.controller.js');
var applications = require('../../../applications/server/controllers/applications.server.controller.js');

module.exports = function(app){

  app.route('/api/users')
     .post(users.create)
     .get(users.findAll);

  app.route('/api/users/login')
     .post(users.login);

  app.route('/api/users/applications/:applicationId')
     .put(users.registerForApp);

  app.param("applicationId", applications.applicationByID);
}
