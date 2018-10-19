var mongoose = require( 'mongoose' );
var bcrypt = require('bcrypt-nodejs');

//Schema for company
var jobSchema = new mongoose.Schema({
    companyId:{
      type: String,
      required: true
    },
    title:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
    salary:{
      type: Number,
      required: true
    },
    company: {type: mongoose.Schema.Types, ref: 'Company'},
    applied: {
      type: Boolean
    }
});


module.exports = mongoose.model('Job', jobSchema);
