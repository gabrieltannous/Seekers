var express = require('express');
var router = express.Router();
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

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
router.get('/', function (req, res, next) {
  res.status(200).send('API is working');
});

// Routes
const authRoutes = require('./AuthRouter');
const companyRoutes = require('./CompanyRouter');
const jobRoutes = require('./JobRouter');
const userRoutes = require('./UserRouter');

// Auth Routes
router.use('/auth', authRoutes);

// Company Routes
router.use('/company', companyRoutes);

// Job Routes
router.use('/job', jobRoutes);

// User Routes
router.use('/user', userRoutes);


router.use(function(req, res) {
  res.status(404).send("Page Not Found");
});

module.exports = router;
