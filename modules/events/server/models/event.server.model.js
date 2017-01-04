'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    appVersion: String,
    stackTrace: {
        type: String
    },
    timestamp: {
        type: Date,
        required: true
    },
    data: String,
    fragment: {
        type: String,
        required: true
    },
    application: {
        type: Schema.Types.ObjectId,
        ref: 'Application',
        required: true
    },
    comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
});

eventSchema.pre('validate', function (next) {
    this.timestamp = new Date();
    next();
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
