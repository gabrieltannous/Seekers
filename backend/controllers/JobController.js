var Company = require('../models/Company');
var Application = require('../models/Application');
var Job = require('../models/Job');
var User = require('../models/User');

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

//find all applicants
module.exports.get_applicants = (req, res) => {
  Application.find({
    jobId: req.body.jobId
  }, function (err, records) {
    if (err) throw err;

    if (!records)
      return res.status(400).json({
        success: false
      });

    var app_ids = records.map(value => value.userId);

    User.find()
      .where('_id')
      .in(app_ids)
      .exec(function (err, records) {
        if (err) throw err;
        if (!records)
          return res.json({
            success: false
          });

        res.status(200).json({
          success: true,
          applicants: records
        });
      });
  });
}

module.exports.get_all_jobs = (req, res) => {
  var uid = req.user._id;
  var allJobs;
  Job.find({}, function (err, result) {
    if (err) throw err;
    if (!result)
      return res.status(400).json({
        success: false
      });

    //convert to javascript object to add applied property
    allJobs = JSON.parse(JSON.stringify(result));

    // find jobs that user already applied
    Application.find({
      userId: uid
    }, function (error, records) {
      if (error) throw error;

      if (!records)
        return res.status(200).json({
          success: true,
          jobs: allJobs
        });

      for (var i = 0; i < allJobs.length; i++) {
        allJobs[i]["applied"] = false;
        for (var j = 0; j < records.length; j++) {
          if (allJobs[i]._id == records[j].jobId) {
            allJobs[i]["applied"] = true;
            break;
          }
        }
      }

      res.status(200).json({
        success: true,
        jobs: allJobs
      });
    });

  });
}

module.exports.get_applied_jobs = (req, res, next) => {
  var uid = req.user._id;

  //find user applications
  Application.find({
    userId: uid
  }, function (error, records) {
    if (error) throw error;

    if (!records)
      res.status(400).json({
        success: false
      });

    var job_ids = records.map(value => value.jobId);

    Job.find()
      .where('_id')
      .in(job_ids)
      .exec(function (error, records) {
        if (error) throw error;

        var com_ids = records.map(value => value.companyId);
        var applied = JSON.parse(JSON.stringify(records));
        Company.find()
          .where('_id')
          .in(com_ids)
          .exec(function (error, records) {
            if (error) throw error;

            for (var i = 0; i < applied.length; i++) {
              for (var j = 0; j < records.length; j++) {
                if (applied[i].companyId == records[j]._id) {
                  applied[i]["company"] = JSON.parse(JSON.stringify(records[j]));
                  break;
                }
              }
            }
            res.status(200).json({
              success: true,
              applied: applied
            });
          });
      });
  });
}
