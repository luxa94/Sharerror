'use strict';

module.exports = function (app) {

    app.use(function (err, req, res, next) {
        var message = err.message;
        var error = err.error || err;
        var status = err.status || 500;

        res.status(status).json({
            message: message,
            error: error
        });
    });
}
