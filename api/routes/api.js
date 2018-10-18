var express = require('express');
var router = express.Router();
const { body,query,validationResult  } = require('express-validator/check');

//passport, mongoose
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config/database');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');

//models
var Company = require("../models/company");

//get user token from req headers
getToken = function (headers) {
  if (headers && headers.authorization) {
    var parts = headers.authorization.split(' ');
    if (parts.length === 2) {
      return parts[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

/* test API */
router.get('/', function(req, res, next) {
  res.send('API is working');
});


//sign up a comapany
router.post('/signupCompany',
  [
    body('email',"Invalid email").isEmail(), 
    body('name',"Name cannot be blank").not().isEmpty(),
    body('password',"Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({ min: 6,max: 32 })
  ],
  function(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var err_array = errors.array().map(value => { return value.msg }); 
      return res.json({success: false, msg: err_array });
    }
	  // console.log(req.body.email);
   //  console.log(req.body.password);
   //  console.log(req.body.name);

    //create a new document
    var newCom = new Company({
      email: req.body.email,
      name: req.body.name
    });
    
    //encrypt password using bcrypt
    newCom.setPassword(req.body.password, function(error,isSuccess){
    		if(isSuccess && !error){
    			newCom.save(function(err) {
      				if (err) {
        				return res.json({success: false, msg: ["This email already exists"] });
      				}
      				res.json({success: true, msg: ['Successfully created new user.'] });
    			});
    		}else{
    			res.json({success: false, msg: ["Hash problem"] });
    		}
    });    
});

//sign in a comapany
router.post('/signinCompany',
  [
    body('email',"Invalid email").isEmail(), 
    body('password',"Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({ min: 6,max: 32 })
  ],
  function(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var err_array = errors.array().map(value => { return value.msg }); 
      return res.json({success: false, msg: err_array });
    }
    // console.log(req.body.email);
    // console.log(req.body.password);
   Company.findOne({ email: req.body.email}, 
      function(err, company) {
        if (err) throw err;

        if (!company) {
          res.json({success: false, msg: 'Company not found.'});
        } else {
          // check if password matches
          company.comparePassword(req.body.password, function (err, isMatch) {
              if (isMatch && !err) {
                  //create token for user  
                  var token = jwt.sign(company.toJSON(), config.secretCompany);
                  res.json({success: true, token: config.passportScheme + " " + token});
              } else {
                  res.json({success: false, msg: 'Wrong password.'});
              }       
          });
        }
    });
});


//Company Authentication failed
router.get('/companyAuthenticationFailure', function(req, res) {
  res.json({isCompany: false});
});

//authenticate Company
router.get('/isCompany', 
  passport.authenticate('jwt-company', 
    { failureRedirect: 'companyAuthenticationFailure',session: false}), 
  function(req, res) {
      res.json({isCompany: true,name: req.company.name});
});

module.exports = router;
