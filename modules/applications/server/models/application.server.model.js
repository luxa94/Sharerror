'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require('../../../events/server/models/event.server.model');
var eventSchema = Event.schema;

var applicationSchema = new Schema({
    dns: {
        type: String,
        unique: true,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    version: {
        type: String
    },
    repository: {
        type: String
    },
    users: [{type: Schema.Types.ObjectId, ref: 'User'}],
    events: [eventSchema]
});

var Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
