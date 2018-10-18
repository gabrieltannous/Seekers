var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsersSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
}, {
  versionKey: false
});


module.exports = mongoose.model('user', UsersSchema);
