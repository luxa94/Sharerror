var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applicationSchema = new Schema({
  dns: {
    type: String,
    unique: true,
    required: true
  },
  ownerId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  version: {
    type: String
  },
  repository: {
    type: String
  },
  users: [{type: Schema.Types.ObjectId, ref: 'User'}],
  events: [Event]
});

var Application = mongoose.model('Application', applicationSchema);

module.exports = Application;
