'use strict';

var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Comment = mongoose.model('Comment');
var jwt = require('jwt-simple');
var properties = require('../../../../config/application.properties');
var secret = properties.jwtSecret;

module.exports.findOne = function (req, res, next) {
    res.json(req.event);
};

module.exports.createComment = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }

    var event = req.event;
    req.body.author = decoded.id;
    var comment = new Comment(req.body);

    Event.findByIdAndUpdate(event._id, {$push: {"comments": comment}}, function (err, event) {
        if (err) {
            return next(err);
        } else if (!event) {
            err = {
                status: 404
            };
            return next(err);
        }

        res.end();
    });
};

module.exports.eventById = function (req, res, next, id) {
    Event.findById(id, (function (err, event) {
        if (err) {
            return next(err);
        } else if (!event) {
            err = {
                status: 404
            };
            return next(err);
        }
        req.event = event;
        next();
    }));
};
