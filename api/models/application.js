var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var applicationSchema = new mongoose.Schema({
    jobId:{
      type: String,
      required: true
    },
    userId:{
      type: String,
      required: true
    }
});

applicationSchema.index({jobId:1, userId:1}, { unique: true });
module.exports = mongoose.model('Application', applicationSchema);