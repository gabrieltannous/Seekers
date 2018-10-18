var express = require('express');
var router = express.Router();


//passport, mongoose
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

//models
var Company = require("../models/company");

/* test API */
router.get('/', function(req, res, next) {
  res.send('API is working');
});

router.post('/signupCompany', function(req, res, next) {
	console.log(req.body.email);
    console.log(req.body.password);
    console.log(req.body.name);

    //create a new document
    var newCom = new Company({
      email: req.body.email,
      hash: req.body.password,
      name: req.body.name
    });
    
    //encrypt password using bcrypt
    newCom.setPassword(req.body.password, function(error,isSuccess){
    		if(isSuccess && !error){
    			newCom.save(function(err) {
      				if (err) {
        				return res.json({success: false, msg: "save problems", details: err});
      				}
      				res.json({success: true, msg: 'Successful created new user.'});
    			});
    		}else{
    			res.json({success: false, msg: "hash problems", details: error});
    		}
    });    
});
module.exports = router;
