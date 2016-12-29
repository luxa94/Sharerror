'use strict';

var events = require('../controllers/events.server.controller');
var comments = require('../../../comments/server/controllers/comment.server.controller');

module.exports = function (app) {

    app.route('/api/events/:eventId')
        .get(events.findOne);

    app.route('/api/events/:eventId/comments')
        .post(events.createComment);

    app.param('eventId', events.eventById);
};
