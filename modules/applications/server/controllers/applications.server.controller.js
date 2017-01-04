'use strict';

var mongoose = require('mongoose');
var Application = mongoose.model('Application');
var User = mongoose.model('User');
var Event = mongoose.model('Event');
var mailService = require('../../../../config/mailService');
var jwt = require('jwt-simple');
var properties = require('../../../../config/application.properties');
var secret = properties.jwtSecret;

module.exports.create = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }
    req.body.owner = decoded.id;
    var application = new Application(req.body);
    Application.findOne({'dsn': application.dsn}, function (err, applicationDb) {
        if (err) {
            return next(err);
        } else if (applicationDb) {
            err = {
                status: 422,
                message: 'DSN taken!'
            };
            return next(err);
        }
        application.save(function (err) {
            if (err) {
                err.status = 422;
                return next(err);
            }
            User.findByIdAndUpdate(decoded.id, {$push: {ownedApplications: application}}, function () {
                res.json(application);
            });
        });
    });
};

module.exports.findAll = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }

    Application
        .find({$or: [{owner: decoded.id}, {users: decoded.id}]}).populate('owner users')
        .exec().then(function (applications) {
        res.json(applications);
    });
};

module.exports.findOne = function (req, res, next) {
    var token = req.headers.authorization;
    if (!token) {
        return next({status: 401})
    }

    var decoded = jwt.decode(token, secret);
    if (!decoded) {
        return next({status: 401})
    }

    var application = req.application;
    var hasAccess = false;
    for (var u = 0; u < application.users.length; u++) {
        var user = application.users[u];
        if (user._id.toString() === decoded.id) {
            hasAccess = true;
            break;
        }
    }
    if (!(application.owner._id.toString() === decoded.id || hasAccess)) {
        return next({status: 404})
    }

    res.json(req.application);
    next();
};

module.exports.delete = function (req, res, next) {
    var application = req.application;

    application.remove(function (err) {
        if (err) {
            return next(err);
        }
        res.json(application);
    });
};

module.exports.createEvent = function (req, res, next) {
    var application = req.application;
    var event = new Event(req.body);
    event.application = application;
    event.save(function (err) {
        if (err) {
            return next(err);
        }
        Application.findByIdAndUpdate(application._id, {$push: {"events": event}}, function (err, application) {
            if (err) {
                return next(err);
            } else if (!application) {
                err = {
                    status: 404
                };
                return next(err);
            }

            var userIds = application.users.slice();
            userIds.push(application.owner);

            User.find({'_id': {$in: userIds}}, function (err, users) {
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

            res.json(application);
        });
    })
};

module.exports.applicationByID = function (req, res, next, id) {
    Application.findById(id).populate('owner users events').exec().then(function (application) {
        if (application) {
            req.application = application;
        } else {
            return next({status: 404});
        }
        next();
    }).catch(function (err) {
        return next({status: 404});
    });
};

module.exports.applicationByDSN = function (req, res, next, dsn) {
    Application.findOne({'dsn': dsn}).populate('owner users events').exec().then(function (application) {
        if (application) {
            req.application = application;
        } else {
            return next({status: 404});
        }
        next();
    }).catch(function (err) {
        return next({status: 404});
    });
};
