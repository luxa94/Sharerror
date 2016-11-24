var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sherror');

var expressConfig = require('./config/express');

var app = expressConfig();
var port = process.env.PORT || 8080;
app.listen(port);

console.log('Server radi na portu ' + port);
