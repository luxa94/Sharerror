'use strict';

var comments = require('../controllers/comment.server.controller');

module.exports = function (app) {
    app.route('/api/comments/:commentId')
        .post(comments.createComment);

    app.param('commentId', comments.commentById);
};