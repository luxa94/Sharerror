'use strict';

var comments = require('../controllers/comment.server.controller');

module.exports = function (app) {
    app.route('/api/comments/:commentId')
        .get(comments.findOne);

    app.route('/api/comments/:commentId/comments')
        .post(comments.createComment);

    app.param('commentId', comments.commentById);
};