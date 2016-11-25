'use strict';

var mongoose = require('mongoose'),
    Application = mongoose.model('Application'),
    User = mongoose.model('User'),
    Event = mongoose.model('Event'),
    mailService = require('../../../../config/mailService');

exports.create = function(req, res, next) {
  var application = new Application(req.body);
  Application.findOne({'dns': application.dns}, function(err, applicationDb) {
    if (err) {
      return next(err);
    } else if (applicationDb) {
      err = {
        status: 422,
        message: 'DNS taken!'
      }
      return next(err);
    }
    User.findById(application.ownerId, function(err, user) {
      if (err) {
        err = {
          status : 422
        }
        return next(err);
      } else if (!user) {
        err = {
          status : 404
        }
        return next(err);
      }
      application.save(function(err) {
        if (err) {
          err = {
            status : 422
          }
          return next(err);
        }
        res.json(application);
      });
    });
  });
};

exports.findAll = function(req, res, next) {
  Application.find().populate('ownerId users').exec(function(err, applications) {
    if (err) {
      return next(err);
    }
    res.json(applications);
  });
}

exports.delete = function(req, res, next) {
  var application = req.application;

  application.remove(function(err){
    if (err) {
      return next(err);
    }
    res.json(application);
  });
};

exports.createEvent = function(req, res, next){
  var application = req.application;
  var event = new Event(req.body);
  Application.findByIdAndUpdate(application._id, {$push:{"events":event}}, function (err, application) {
    if (err) {
      return next(err);
    } else if (!application) {
      err = {
        status : 404
      }
      return next(err);
    }

    // application.populate('ownerId users').exec(function(err, application){

      var userIds = application.users.slice();
      userIds.push(application.ownerId);

      User.find({'_id': { $in: userIds} }, function(err, users){
        for (var u in users) {
          var user = users[u];
          var payload = {
            email: user.email,
            applicationName: application.name,
            version: event.appVersion,
            message: event.data
          };
          mailService.send(payload);
        }
      });
    // });

    res.json(application);
  });
};


exports.applicationByID = function(req, res, next, id){
  Application.findById(id).populate('ownerId users').exec(function(err, application){
    if (err) {
      return next(err);
    } else if (!application){
      err = {
        status : 404
      }
      return next(err);
    }
    req.application = application;
    next();
  });
};

exports.applicationByDNS = function(req, res, next, dns){
  Application.findOne({'dns': dns}).populate('ownerId users').exec(function(err, application){
    if (err) {
      return next(err);
    } else if (!applcation) {
      err = {
        status : 404
      }
      return next(err);
    }
    req.application = application;
    next();
  });
}
