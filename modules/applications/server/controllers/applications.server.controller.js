'use strict';

var mongoose = require('mongoose'),
    Application = mongoose.model('Application');


exports.create = function(req, res){
  var application = new Application(req.body);

  application.save(function(err){
    if (err){
      return res.status(422);
    }
    res.json(application);
  });
};

exports.delete = function(req, res){
  var application = req.application;

  application.remove(function(err){
    if (err){
      return res.status(422);
    }
    res.json(application);
  });
};

exports.applicationByID = function(req, res, next, id){
  Application.findById(id).populate('ownerId users').exec(function(err, application){
    if (err){
      return next(err);
    }else if (!article){
      return res.status(404);
    }
    req.application = application;
    next();
  });
};

exports.applicationByDNS = function(req, res, next, dns){
  Application.findOne({'dns': dns}).populate('ownerId users').exec(function(err, application){
    if (err){
      return next(err);
    }else if (!application){
      return res.status(404);
    }
    req.application = application;
    next();
  });
}
