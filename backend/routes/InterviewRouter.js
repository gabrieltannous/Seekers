const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const InterviewController = require('../controllers/InterviewController');

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

//set an interview
router.post('/setInterview', CompanyAuthenticateRoute, InterviewController.set_interview);

//get company interviews
router.get('/getCompanyInterviews', CompanyAuthenticateRoute, InterviewController.get_company_interviews);

//get user interviews
router.get('/getUserInterviews', UserAuthenticateRoute, InterviewController.get_user_interviews);

//update user interview decision
router.post('/updateUserInterview', UserAuthenticateRoute, InterviewController.update_user_interview);

module.exports = router;
