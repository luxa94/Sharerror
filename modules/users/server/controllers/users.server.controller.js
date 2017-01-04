'use strict';

var mongoose = require('mongoose');
var User = mongoose.model('User');
var Application = mongoose.model('Application');
var jwt = require('jwt-simple');
var properties = require('../../../../config/application.properties');
var secret = properties.jwtSecret;

module.exports.create = function (req, res, next) {
    var user = new User(req.body);

    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json(user);
    });
};

module.exports.login = function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({'email': email, 'password': password}, function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            err = {
                status: 401,
                message: "Wrong email/password"
            };
            return next(err);
        }

        var userForJwt = {
            id: user._id,
            email: user.email
        };
        var token = jwt.encode(userForJwt, secret);

        var resObject = {token: token};
        res.json(resObject);
    });
};

module.exports.findAll = function (req, res, next) {
    User.find().populate('applications').exec().then(function (users) {
        res.json(users);
    });
};

module.exports.registerForApp = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }

    var application = req.application;
    var user = req.user;
    if (!user || !application) {
        return next({status: 404});
    }

    if (application.owner._id.toString() !== decoded.id) {
        return next({
            status: 403,
            message: decoded.id + 'You are not an owner of this application.' + application.owner._id
        });
    }

    Application.findByIdAndUpdate(application._id, {$push: {"users": user._id}}, function (err, _application) {
        if (err) {
            return next(err);
        }

        User.findByIdAndUpdate(user._id, {$push: {'applications': application._id}}, function (err, user) {
            if (err) {
                return next(err);
            }
        });
        res.json({status: 200});
    });
};

module.exports.userByID = function (req, res, next, id) {
    User.findById(id).populate('applications').exec().then(function (user) {
        if (user) {
            req.user = user;
        } else {
            return next({status: 404});
        }
        next();
    }).catch(function (err) {
        return next({status: 404});
    });
};
