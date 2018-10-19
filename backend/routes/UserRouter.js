const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const UserController = require('../controllers/UserController');

// User Authentication Method
const UserAuthenticateRoute = passport.authenticate('jwt-user', {
  failureRedirect: 'userAuthenticationFailure',
  session: false
});

//update user profile
router.post('/updateUserProfile',
  [
    body('fullName', "Name cannot be blank").not().isEmpty()
  ],
  UserAuthenticateRoute, UserController.update_profile);

module.exports = router;
