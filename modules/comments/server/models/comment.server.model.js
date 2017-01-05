'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../../../users/server/models/user.server.model');

var commentSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: true
    },
    createdAt: Date
});

commentSchema.pre('validate', function (next) {
    this.createdAt = new Date();
    next();
});

var Comment = mongoose.model('Comment', commentSchema);

commentSchema.add({comments:[{type: Schema.Types.ObjectId, ref: 'Comment'}]});

module.exports = Comment;
