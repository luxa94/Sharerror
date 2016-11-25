'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    Application = mongoose.model('Application');

exports.create = function(req, res, next) {
  var user = new User(req.body);

  user.save(function(err) {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
}

//premestiti u auth kasnije
exports.login = function(req, res, next) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({'email': email, 'password': password}, function(err, user) {
    if (err) {
      return next(err);
    }else if (!user){
      err = {
        status : 401,
        message : "Wrong email/password",
      }
      return next(err);
    }
    res.json(user);
  });
}

exports.findAll = function(req, res, next) {
  User.find().populate('applications').exec(function(err, users){
    if (err) {
      return next(err);
    }
    res.json(users);
  });
}

exports.registerForApp = function(req, res, next) {
  var application = req.application;
  var user = req.user;

  if (!user || !application) {
    return next({ status: 404 });
  }

  Application.findByIdAndUpdate(application._id, {$push:{"users": user._id}}, function (err, _application) {
    if (err) {
      return next(err);
    }

    User.findByIdAndUpdate(user._id, {$push: {'applications': application._id}}, function (err, user) {
      if (err) {
        return next(err);
      }
    });
    res.json(_application);
  });
}

exports.userByID = function(req, res, next, id){
  User.findById(id).populate('applications').exec(function(err, user) {
    if (err) {
      return next(err);
    } else if (!user) {
      err = {
        status : 404
      }
      return next(err);
    }
    req.user = user;
    next();
  });
};
