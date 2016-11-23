'use strict';

var users = require('../controllers/users.server.controller.js')
var applications = require('../controllers/applications.server.controller.js')

module.exports = function(app){

  app.route('/api/users')
     .post(users.create);

  app.route('api/users/login')
     .post(users.login);

  //???
  app.route('api/users/:applicationId')
     .put(users.registerForApp)

  app.param('applicationId', applications.applicationByID);
}
