'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../../../users/server/models/user.server.model');
var userSchema = User.schema;

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
    createdAt: Date,
    updatedAt: Date
});

commentSchema.add({comments: [commentSchema]});

commentSchema.pre('save', function (next) {
    var currentDate = new Date();

    this.updatedAt = currentDate;

    if (!this.createdAt)
        this.createdAt = currentDate;

    next();
});

var Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
