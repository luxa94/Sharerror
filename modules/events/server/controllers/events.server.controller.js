'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event'),

exports.eventById = function(req, res, next, id){
  Event.findById(id, (function(err, event){
    if (err){
      return next(err);
    }else if (!event){
      res.status(404);
      res.end();
      return;
    }
    req.event = event;
    next();
  }));
}
