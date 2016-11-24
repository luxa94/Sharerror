var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  applications: [{type: Schema.Types.ObjectId, ref: 'Application'}]
});

var User = mongoose.model('User', userSchema);

module.exports = User;
