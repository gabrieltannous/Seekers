const express = require('express');
const router = express.Router();
const passport = require('passport');

const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const UserController = require('../controllers/UserController');
const CompanyController = require('../controllers/CompanyController');

// User Authentication Method
const UserAuthenticateRoute = passport.authenticate('jwt-user', {
  failureRedirect: 'userAuthenticationFailure',
  session: false
});

// Company Authentication Method
const CompanyAuthenticateRoute = passport.authenticate('jwt-company', {
  failureRedirect: 'companyAuthenticationFailure',
  session: false
});

//user Authentication failed
router.get('/userAuthenticationFailure', UserController.user_authentication_failure);

//authenticate user
router.get('/isUser', UserAuthenticateRoute, UserController.is_user);

//sign in a user
router.post('/signinUser',
  [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ], UserController.sign_in);

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
  UserController.sign_up);

//Company Authentication failed
router.get('/companyAuthenticationFailure', CompanyController.company_authenticate_failure);

//authenticate Company
router.get('/isCompany', CompanyAuthenticateRoute, CompanyController.is_company);

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
  ], CompanyController.sign_up);


//sign in a comapany
router.post('/signinCompany',
  [
    body('email', "Invalid email").isEmail(),
    body('password', "Password must be 6 - 32 characters in length")
    .not().isEmpty().isLength({
      min: 6,
      max: 32
    })
  ], CompanyController.sign_in);


module.exports = router;
