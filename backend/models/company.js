var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var companySchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  phone: String,
  photo: String,
  address: String,
  website: String
});


//encrypt password using bcrypt
companySchema.methods.setPassword = function(password,callback){
    var company = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return callback(err,false);
        }
        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) {
              return callback(err,false);
          }
          company.hash = hash;
          callback(null, true);
      });
    });
};

//compare password with hash
companySchema.methods.comparePassword = function (password, callback) {
    var company = this;
    bcrypt.compare(password, company.hash, function (err, isMatch) {
        if (err) {
            return callback(err,false);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Company', companySchema);
