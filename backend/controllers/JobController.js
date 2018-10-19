var Company = require('../models/Company');
var Application = require('../models/Application');
var Job = require('../models/Job');

module.exports.get_jobs = (req, res) => {
  Job.find({}, function (err, data) {
    if (err) {
      res.status(400).json({
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
}

module.exports.get_all_company_jobs = (req, res) => {
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
}

module.exports.add_company_jobs = (req, res) => {
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
};


//apply to Job - current user
module.exports.apply_to_job = (res, req) => {
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
}
