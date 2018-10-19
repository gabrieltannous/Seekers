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
var Job = require("../models/job");
var User = require("../models/user");
var Application = require("../models/application");
var Admin = require("../models/admin");

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

    //check admin email
    var admins = config.adminEmails;
    for(var i = 0; i < admins.length; i++){
        if(admins[i] == req.body.email){
          return res.json({success: false, msg: ["This email already exists"] });
        }
    }

    //check user email
    User.findOne( {email:req.body.email },function (e,user) {
        if(e) throw e;

        if(user)
          return res.json({success: false, msg: ["This email already exists"] });

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
      res.json({isCompany: true,company: req.company});
});



//update company profile
router.post('/updateCompanyProfile',
  [ 
    body('name',"Name cannot be blank").not().isEmpty()
  ],
  passport.authenticate('jwt-company', 
    { failureRedirect: 'companyAuthenticationFailure',session: false}),
  function(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var err_array = errors.array().map(value => { return value.msg }); 
      return res.json({ success: false, msg: err_array });
    }

    // console.log(req.company);

    var id = req.company._id;

    Company.findByIdAndUpdate(id,{$set:req.body}, 
      function(err, result) {
        if (err) throw err;

        console.log(result);
        if (!result) {
          res.json({ success: false, msg: ['Problem occurs. Data cannot be saved'] });
        } else {
          res.json({ success: true, msg: ['Profile updated successfuly'] });
        }
    });

});

//add Job - current user
router.post('/addCompanyJob',
  [
    body('companyId',"Unable to find the company").not().isEmpty(),
    body('type',"Type cannot be empty").not().isEmpty(), 
    body('title',"Title cannot be empty").not().isEmpty(),
    body('salary',"Salary cannot be empty").not().isEmpty()
  ],
  passport.authenticate('jwt-company', 
    { failureRedirect: 'companyAuthenticationFailure',session: false}),
  function(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var err_array = errors.array().map(value => { return value.msg }); 
      return res.json({success: false, msg: err_array });
    }


    //create a new document
    var newJob = new Job({
      companyId: req.body.companyId,
      type: req.body.type,
      title: req.body.title,
      salary: req.body.salary
    });
    
    //add job
    newJob.save(function(err) {
        if (err) {
          return res.json({success: false, msg: ["Database error. Job cannot be added"] });
        }
        res.json({success: true, msg: ['Successfuly added new job'] });
    });   
});


//get all jobs - current user
router.get('/getAllCompanyJobs',
  passport.authenticate('jwt-company', 
    { failureRedirect: 'companyAuthenticationFailure',session: false}),
  function(req, res, next) {
    //find all jobs of current user
    Job.find({ companyId: req.company._id}, function(err, jobs) {
        if (err) {
          return res.json({success: false});
        }
        res.json({success: true, jobs: jobs });
    });   
});


// sign up a user
router.post('/signupUser',
  [
    body('email',"Invalid email").isEmail(), 
    body('fullName',"Name cannot be blank").not().isEmpty(),
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

    //check admin email
    var admins = config.adminEmails;
    for(var i = 0; i < admins.length; i++){
        if(admins[i] == req.body.email){
          return res.json({success: false, msg: ["This email already exists"] });
        }
    }

    //check company email
    Company.findOne( {email:req.body.email },function (e,company) {
        if(e) throw e;

        if(company)
          return res.json({success: false, msg: ["This email already exists"] });

        //create a new document
        var newUser = new User({
          email: req.body.email,
          fullName: req.body.fullName
        });
        
        //encrypt password using bcrypt
        newUser.setPassword(req.body.password, function(error,isSuccess){
            if(isSuccess && !error){
              newUser.save(function(err) {
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
});

//sign in a user
router.post('/signinUser',
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
   User.findOne({ email: req.body.email}, 
      function(err, user) {
        if (err) throw err;

        if (!user) {
          res.json({success: false, msg: 'User not found.'});
        } else {
          // check if password matches
          user.comparePassword(req.body.password, function (err, isMatch) {
              if (isMatch && !err) {
                  //create token for user  
                  var token = jwt.sign(user.toJSON(), config.secretUser);
                  res.json({success: true, token: config.passportScheme + " " + token});
              } else {
                  res.json({success: false, msg: 'Wrong password.'});
              }       
          });
        }
    });
});

//user Authentication failed
router.get('/userAuthenticationFailure', function(req, res) {
  res.json({isUser: false});
});

//authenticate user
router.get('/isUser', 
  passport.authenticate('jwt-user', 
    { failureRedirect: 'userAuthenticationFailure',session: false}), 
  function(req, res) {
      res.json({isUser: true,user: req.user});
});


//update user profile
router.post('/updateUserProfile',
  [ 
    body('fullName',"Name cannot be blank").not().isEmpty()
  ],
  passport.authenticate('jwt-user', 
    { failureRedirect: 'companyAuthenticationFailure',session: false}),
  function(req, res, next) {
    //validate request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      var err_array = errors.array().map(value => { return value.msg }); 
      return res.json({ success: false, msg: err_array });
    }

    // console.log(req.company);

    var id = req.user._id;

    User.findByIdAndUpdate(id,{$set:req.body}, 
      function(err, result) {
        if (err) throw err;

        console.log(result);
        if (!result) {
          res.json({ success: false, msg: ['Problem occurs. Data cannot be saved'] });
        } else {
          res.json({ success: true, msg: ['Profile updated successfuly'] });
        }
    });

});
module.exports = router;
