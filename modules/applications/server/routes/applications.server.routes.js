'use strict';

var applications = require('../controllers/applications.server.controller')

module.exports = function(app){

  app.route('/api/applications')
     .post(applications.create)

  app.route('/api/applications/:applicationId')
     .delete(applications.delete)

  app.param('applicationId', applications.applicationByID)
  app.param('applicationDns', application.applicationByDNS)
}
