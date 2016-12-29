'use strict';

var mongoose = require('mongoose');
var Comment = mongoose.model('Comment');
var jwt = require('jwt-simple');
var properties = require('../../../../config/application.properties');
var secret = properties.jwtSecret;

module.exports.createComment = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }

    var comment = req.event;
    req.body.author = decoded.id;
    var newComment = new Comment(req.body);

    Comment.findByIdAndUpdate(comment._id, {$push: {"comments": newComment}}, function (err, comment) {
        if (err) {
            return next(err);
        } else if (!comment) {
            err = {
                status: 404
            };
            return next(err);
        }

        res.end();
    });
};

module.exports.commentById = function (req, res, next, id) {
    Comment.findById(id, function (err, comment) {
        if (err) {
            return next(err);
        } else if (!comment) {
            err = {
                status: 404
            };
            return next(err);
        }
    });
};