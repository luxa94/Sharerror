'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),

exports.eventById = function(req, res, next, id) {
  Event.findById(id, (function(err, event) {
    if (err) {
      return next(err);
    } else if (!event) {
      err = {
        status: 404
      }
      return next(err);
    }
    req.event = event;
    next();
  }));
}
