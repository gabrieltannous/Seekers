const jwt = require('jsonwebtoken');
var config = require('../config/database');
var Company = require('../models/Company');

const {
  validationResult
} = require('express-validator/check');

module.exports.update_company_profile = (req, res) => {
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

  var id = req.company._id;

  Company.findByIdAndUpdate(id, {
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

module.exports.company_authenticate_failure = (req, res) => {
  res.json({
    isCompany: false
  });
}

module.exports.is_company = (req, res) => {
  res.json({
    isCompany: true,
    company: req.company
  });
}

module.exports.sign_up = (req, res) => {
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

  //check admin email
  var admins = config.adminEmails;
  for (var i = 0; i < admins.length; i++) {
    if (admins[i] == req.body.email) {
      return res.status(400).json({
        success: false,
        msg: ["This email already exists"]
      });
    }
  }

  //check user email
  User.findOne({
    email: req.body.email
  }, function (e, user) {
    if (e) throw e;

    if (user)
      return res.status(400).json({
        success: false,
        msg: ["This email already exists"]
      });

    //create a new document
    var newCom = new Company({
      email: req.body.email,
      name: req.body.name
    });

    //encrypt password using bcrypt
    newCom.setPassword(req.body.password, function (error, isSuccess) {
      if (isSuccess && !error) {
        newCom.save(function (err) {
          if (err) {
            return res.status(400).json({
              success: false,
              msg: ["This email already exists"]
            });
          }
          res.status(201).json({
            success: true,
            msg: ['Successfully created new user.']
          });
        });
      } else {
        res.status(400).json({
          success: false,
          msg: ["Hash problem"]
        });
      }
    });
  });
}

module.exports.sign_in = (req, res, next) => {
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
  Company.findOne({
      email: req.body.email
    },
    function (err, company) {
      if (err) throw err;

      if (!company) {
        res.status(400).json({
          success: false,
          msg: 'Company not found.'
        });
      } else {
        // check if password matches
        company.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            //create token for user  
            var token = jwt.sign(company.toJSON(), config.secretCompany);
            res.status(200).json({
              success: true,
              token: config.passportScheme + " " + token
            });
          } else {
            res.status(400).json({
              success: false,
              msg: 'Wrong password.'
            });
          }
        });
      }
    });
}

module.exports.get_applied_company_profile = (req, res) => {
  Company.findOne({
    _id: req.body.companyId
  }, function (err, company) {
    if (err) throw err;

    if (!company)
      return res.status(400).json({
        success: false
      });
    else
      return res.status(200).json({
        success: true,
        company: company
      });
  });
}
