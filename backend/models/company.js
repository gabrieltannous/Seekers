var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CompaniesSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String
  },
  photo: {
    type: String
  },
  address: {
    type: String
  },
  website: {
    type: String
  }
}, {
  versionKey: false
});

module.exports = mongoose.model('company', CompaniesSchema);
