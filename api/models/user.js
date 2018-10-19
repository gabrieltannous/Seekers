var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  phone: String,
  mobile: String,
  photo: String,
  address: String,
  resume: String
});


//encrypt password using bcrypt
userSchema.methods.setPassword = function(password,callback){
    var user = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return callback(err,false);
        }
        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) {
              return callback(err,false);
          }
          user.hash = hash;
          callback(null, true);
      });
    });
};

//compare password with hash
userSchema.methods.comparePassword = function (password, callback) {
    var user = this;
    bcrypt.compare(password, user.hash, function (err, isMatch) {
        if (err) {
            return callback(err,false);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);
