const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

const CompanyController = require('../controllers/CompanyController');

// Company Authentication Method
const CompanyAuthenticateRoute = passport.authenticate('jwt-company', {
  failureRedirect: 'companyAuthenticationFailure',
  session: false
});

//update company profile
router.post('/updateCompanyProfile',
  [
    body('name', "Name cannot be blank").not().isEmpty()
  ],
  CompanyAuthenticateRoute,
  CompanyController.update_company_profile );

module.exports = router;
