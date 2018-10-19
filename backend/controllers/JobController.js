// const Job = require('../models/Job');
const Company = require('../models/company');

module.exports.get_jobs = async (res, req) => {
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
