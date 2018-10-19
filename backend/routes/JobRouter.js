const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const JobController = require('../controllers/JobController');
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

//apply to job - current user
router.post('/applyToJob', UserAuthenticateRoute, JobController.apply_to_job);

//get all applicants of one job
router.post('/getApplicants', CompanyAuthenticateRoute, JobController.get_applicants);

//get applicant profile
router.post('/getApplicantProfile', CompanyAuthenticateRoute, UserController.get_applicant_profile);

//user get all jobs
router.get('/getAllJobs', UserAuthenticateRoute, JobController.get_all_jobs);

//get user's applied jobs
router.get('/getAppliedJobs', UserAuthenticateRoute, JobController.get_applied_jobs);

//user get company profile
router.post('/getAppliedCompanyProfile', UserAuthenticateRoute, CompanyController.get_applied_company_profile);

module.exports = router;
