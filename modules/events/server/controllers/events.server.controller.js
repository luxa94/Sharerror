'use strict';

var mongoose = require('mongoose'),
    Event = mongoose.model('Event');
    Application = mongoose.model('Application');

exports.create = function(req, res, next, id){
  var event = new Event(req.body);
  Application.findById(id, function(err, application){
    if (err){
      return next(err);
    }else if (!application){
      return res.status(404);
    }
    event.save(function(err){
      if (err){
        return res.status(422);
      }
      Application.findByIdAndUpdate(application._id, {$push:{"events":event}}, function (err, application) {
        if (err){
          return next(err);
        }else if (!application){
          return res.status(404);
        }
        res.json(application);
      });
      });
  });
};

exports.eventById = function(req, res, next, id){
  Event.findById(id, (function(err, event){
    if (err){
      return next(err);
    }else if (!event){
      return res.status(404);
    }
    req.event = event;
    next();
  })
}
