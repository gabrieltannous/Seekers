const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const JobController = require('../controllers/JobController');

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

//get all jobs with company profile and check if current user applied
router.get('/getJobs', UserAuthenticateRoute, JobController.get_jobs);


//get all jobs - current user
router.get('/getAllCompanyJobs', CompanyAuthenticateRoute, JobController.get_all_company_jobs);


//add Job - current company
router.post('/addCompanyJob',
  [
    body('companyId', "Unable to find the company").not().isEmpty(),
    body('type', "Type cannot be empty").not().isEmpty(),
    body('title', "Title cannot be empty").not().isEmpty(),
    body('salary', "Salary cannot be empty").not().isEmpty(),
    body('salary', "Salary cannot be negative").isInt({
      min: 0
    })
  ], 
  CompanyAuthenticateRoute, JobController.add_company_jobs);

router.post('/applyToJob', UserAuthenticateRoute, JobController.apply_to_job);

module.exports = router;
