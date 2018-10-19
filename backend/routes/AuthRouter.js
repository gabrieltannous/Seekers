const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

// Authentication Method
const authenticateRoute = passport.authenticate('jwt', {
  session: false,
});

//user Authentication failed
router.get('/userAuthenticationFailure', function (req, res) {
  res.json({
    isUser: false
  });
});

//authenticate user
router.get('/isUser',
  passport.authenticate('jwt-user', {
    failureRedirect: 'userAuthenticationFailure',
    session: false
  }),
  function (req, res) {
    res.json({
      isUser: true,
      user: req.user
    });
  });

//sign in a user
router.post('/signinUser',
  [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ],
  function (req, res, next) {
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
  });

// sign up a user
router.post('/signupUser',
  [
    body('email', "Invalid email").isEmail(),
    body('fullName', "Name cannot be blank").not().isEmpty(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ],
  function (req, res, next) {
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
  });

//Company Authentication failed
router.get('/companyAuthenticationFailure', function (req, res) {
  res.json({
    isCompany: false
  });
});

//authenticate Company
router.get('/isCompany',
  passport.authenticate('jwt-company', {
    failureRedirect: 'companyAuthenticationFailure',
    session: false
  }),
  function (req, res) {
    res.json({
      isCompany: true,
      company: req.company
    });
  });

//sign up a comapany
router.post('/signupCompany',
  [
    body('email', "Invalid email").isEmail(),
    body('name', "Name cannot be blank").not().isEmpty(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ],
  function (req, res, next) {
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

    //check user email
    User.findOne({
      email: req.body.email
    }, function (e, user) {
      if (e) throw e;

      if (user)
        return res.json({
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
  });


//sign in a comapany
router.post('/signinCompany',
  [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ],
  function (req, res, next) {
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
    Company.findOne({
        email: req.body.email
      },
      function (err, company) {
        if (err) throw err;

        if (!company) {
          res.json({
            success: false,
            msg: 'Company not found.'
          });
        } else {
          // check if password matches
          company.comparePassword(req.body.password, function (err, isMatch) {
            if (isMatch && !err) {
              //create token for user  
              var token = jwt.sign(company.toJSON(), config.secretCompany);
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
  });


module.exports = router;
