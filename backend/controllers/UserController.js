// Load Models
var User = require('../models/User');
const jwt = require('jsonwebtoken');
var config = require('../config/database');

const {
  validationResult
} = require('express-validator/check');

module.exports.user_authentication_failure = (req, res) => {
  res.json({
    isUser: false
  });
}

module.exports.is_user = (req, res) => {
  res.json({
    isUser: true,
    user: req.user
  });
}

module.exports.sign_in = (req, res, next) => {
  //validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array().map(value => {
      return value.msg
    });
    return res.json({
      success: false,
      msg: err_array
    });
  }
  User.findOne({
      email: req.body.email
    },
    function (err, user) {
      if (err) throw err;

      if (!user) {
        res.json({
          success: false,
          msg: 'User not found.'
        });
      } else {
        // check if password matches
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            //create token for user  
            var token = jwt.sign(user.toJSON(), config.secretUser);
            res.json({
              success: true,
              token: config.passportScheme + " " + token
            });
          } else {
            res.json({
              success: false,
              msg: 'Wrong password.'
            });
          }
        });
      }
    });
}

module.exports.sign_up = (req, res, next) => {
  //validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array().map(value => {
      return value.msg
    });
    return res.json({
      success: false,
      msg: err_array
    });
  }

  //check admin email
  var admins = config.adminEmails;
  for (var i = 0; i < admins.length; i++) {
    if (admins[i] == req.body.email) {
      return res.json({
        success: false,
        msg: ["This email already exists"]
      });
    }
  }

  //check company email
  Company.findOne({
    email: req.body.email
  }, function (e, company) {
    if (e) throw e;

    if (company)
      return res.json({
        success: false,
        msg: ["This email already exists"]
      });

    //create a new document
    var newUser = new User({
      email: req.body.email,
      fullName: req.body.fullName
    });

    //encrypt password using bcrypt
    newUser.setPassword(req.body.password, function (error, isSuccess) {
      if (isSuccess && !error) {
        newUser.save(function (err) {
          if (err) {
            return res.json({
              success: false,
              msg: ["This email already exists"]
            });
          }
          res.json({
            success: true,
            msg: ['Successfully created new user.']
          });
        });
      } else {
        res.json({
          success: false,
          msg: ["Hash problem"]
        });
      }
    });


  });
}

module.exports.update_profile = (req, res, next) => {
  //validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    var err_array = errors.array().map(value => {
      return value.msg
    });
    return res.status(400).json({
      success: false,
      msg: err_array
    });
  }

  var id = req.user._id;

  User.findByIdAndUpdate(id, {
      $set: req.body
    },
    function (err, result) {
      if (err) throw err;

      if (!result) {
        res.status(400).json({
          success: false,
          msg: ['Problem occurs. Data cannot be saved']
        });
      } else {
        res.status(201).json({
          success: true,
          msg: ['Profile updated successfuly']
        });
      }
    });
}

//find all applicants
module.exports.get_applicant_profile = (req, res, next) => {
  User.findOne({
    _id: req.body.userId
  }, function (err, record) {
    if (err) throw err;

    if (!record)
      return res.status(400).json({
        success: false
      });

    res.status(200).json({
      success: true,
      user: record
    });
  });
}
