var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  }
});


//encrypt password using bcrypt
adminSchema.methods.setPassword = function(password,callback){
    var admin = this;
    bcrypt.genSalt(10, function (err, salt) {
        if (err) {
            return callback(err,false);
        }
        bcrypt.hash(password, salt, null, function (err, hash) {
          if (err) {
              return callback(err,false);
          }
          admin.hash = hash;
          callback(null, true);
      });
    });
};

//compare password with hash
adminSchema.methods.comparePassword = function (password, callback) {
    var admin = this;
    bcrypt.compare(password, admin.hash, function (err, isMatch) {
        if (err) {
            return callback(err,false);
        }
        callback(null, isMatch);
    });
};

module.exports = mongoose.model('Admin', adminSchema);
