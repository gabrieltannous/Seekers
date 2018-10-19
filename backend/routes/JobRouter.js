var Company = require("../models/company");
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');
var Job = require("../models/job");

// const JobController = require('../controllers/JobController');


//get all jobs with company profile and check if current user applied
router.get('/getJobs',
  passport.authenticate('jwt-user', {
    failureRedirect: 'userAuthenticationFailure',
    session: false
  }),
  function (req, res, next) {
    Job.find({}, function (err, data) {
      if (err) {
        res.status(200).json({
          success: false
        });
      } else {
        var promises = data.map(function (item) {
          return Company.findById(item.companyId, {})
            .then(res => {
              item.company = res;
              return Application.findOne({
                userId: req.user._id,
                jobId: item._id
              }).then(result => {
                result ? item.applied = true : item.applied = false;
                return item
              });
            })
        })

        Promise.all(promises).then(function (results) {
          res.status(200).json({
            success: true,
            jobs: data
          });
        })
      }
    });
  });


//get all jobs - current user
router.get('/getAllCompanyJobs',
  passport.authenticate('jwt-company', {
    failureRedirect: 'companyAuthenticationFailure',
    session: false
  }),
  function (req, res, next) {
    //find all jobs of current user
    Job.find({
      companyId: req.company._id
    }, function (err, jobs) {
      if (err) {
        return res.status(400).json({
          success: false
        });
      }
      res.status(200).json({
        success: true,
        jobs: jobs
      });
    });
  });


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
  passport.authenticate('jwt-company', {
    failureRedirect: 'companyAuthenticationFailure',
    session: false
  }),
  function (req, res, next) {
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


    //create a new document
    var newJob = new Job({
      companyId: req.body.companyId,
      type: req.body.type,
      title: req.body.title,
      salary: req.body.salary
    });

    //add job
    newJob.save(function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          msg: ["Database error. Job cannot be added"]
        });
      }
      res.status(201).json({
        success: true,
        msg: ['Successfuly added new job']
      });
    });
  });


//apply to Job - current user
router.post('/applyToJob',
  passport.authenticate('jwt-user', {
    failureRedirect: 'userAuthenticationFailure',
    session: false
  }),
  function (req, res, next) {
    //create a new document
    var apply = new Application({
      userId: req.user._id,
      jobId: req.body._id
    });
    //add application
    apply.save(function (err) {
      if (err) {
        return res.status(400).json({
          success: false,
          msg: ["Database error. Cannot apply to job"]
        });
      }
      res.status(201).json({
        success: true,
        msg: ['Successfuly applied to job']
      });
    });
  });

module.exports = router;
