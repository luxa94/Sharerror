'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var eventSchema = new Schema({
    appVersion: String,
    stackTrace: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        required: true
    },
    data: String,
    fragment: {
        type: String,
        required: true
    }
});

eventSchema.pre('save', function (next) {
    if (!this.timestamp) {
        this.timestamp = new Date();
    }
});

var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
