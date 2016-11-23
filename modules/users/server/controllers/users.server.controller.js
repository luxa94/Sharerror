'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User');
    Application = mongoose.model('Application');

exports.create = function(req, res){
  var user = new User(req.body);

  user.save(function(err){
    if (err){
      return res.status(422);
    }
    res.json(user);
  });
}

//premestiti u auth kasnije
exports.login = function(req, res, next){
  var email = req.body.username;
  var password = req.body.password;

  User.findOne({'email': email, 'password': password}, function(err, user){
    if (err){
      return next(err);
    }else if (!user){
      return res.status(401).message('Wrong email/password');
    }
    return res.json(user);
  });
}

exports.registerForApp = function(req, res, next, id){
  var usersId = req.body;
  Application.findById(id, function(err, application){
    if (err){
      return next(err);
    }else if (!application){
      return res.status(404);
    }
    Application.findByIdAndUpdate(application._id, {$push:{"users": {$each: usersId}}}, function (err, application) {
      if (err){
        return next(err);
      }else if (!application){
        return res.status(404);
      }
      res.json(application);
      });
  });
}
