var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var interviewSchema = new mongoose.Schema({
    companyId:{
      type: String,
      required: true
    },
    jobId:{
      type: String,
      required: true
    },
    userId:{
      type: String,
      required: true
    },
    date:{
      type: Date,
      required: true
    },
    decision:{
      type: String
    }
});

interviewSchema.index({jobId:1, userId:1}, { unique: true });
module.exports = mongoose.model('Interview', interviewSchema);
