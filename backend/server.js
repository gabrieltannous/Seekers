var express = require('express');
var path = require("path");
var bodyParser = require('body-parser');
var mongo = require("mongoose");
var expressValidator = require('express-validator')

var db = mongo.connect("mongodb://localhost:27017/Seekers", function (err, response) {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to ' + db, ' + ', response);
  }
});


var app = express()
app.use(bodyParser());
app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(expressValidator());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var Schema = mongo.Schema;

var UsersSchema = new Schema({
  fullName: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  }
}, {
  versionKey: false
});

var CompaniesSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phone: {
    type: String
  },
  photo: {
    type: String
  },
  address: {
    type: String
  },
  website: {
    type: String
  }
}, {
  versionKey: false
});

var JobsSchema = new Schema({
  title: {
    type: String
  },
  type: {
    type: String
  },
  salary: {
    type: Number
  },
  companyId: {
    type: String
  }
}, {
  versionKey: false
});

var AppliesSchema = new Schema({
  jobId: {
    type: String
  },
  userId: {
    type: String
  }
}, {
  versionKey: false
});

var userModel = mongo.model('users', UsersSchema, 'users');
var companyModel = mongo.model('companies', CompaniesSchema, 'companies');
var jobModel = mongo.model('jobs', JobsSchema, 'jobs');
var applyModel = mongo.model('applies', AppliesSchema, 'applies');

app.post("/api/UpdateUser", function (req, res) {
  console.log(req.body.email);
  userModel.findOneAndUpdate(req.body.email, {
      fullName: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      mobile: req.body.mobile,
      photo: req.body.photo,
      resume: req.body.resume,
      fId: req.body.uid
    },
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          data: "Record has been Updated..!!"
        });
      }
    });
})

app.post("/api/UpdateCompany", function (req, res) {
  companyModel.findByIdAndUpdate(req.body.id, {
      title: req.body.fullName,
      phone: req.body.phone,
      address: req.body.address,
      photo: req.body.photo
    },
    function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          data: "Record has been Updated..!!"
        });
      }
    });
})

app.post("/api/SaveGoogleUser", function (req, res) {
  var mod = new userModel(req.body);
  mod.save(function (err, data) {
    req.check('email', 'Invalid Email address').isEmail();
    req.check('fullName', 'Fill full name').notEmpty();
    var errors = req.validationErrors();
    if (err || errors) {
      res.send(err == null ? errors : err);
    } else {
      res.send({
        data: "Record has been Inserted..!!"
      });
    }
  });
})

app.post("/api/CreateUser", function (req, res) {
  req.check('email', 'Invalid Email address').isEmail();
  req.check('fullName', 'Please enter your full name').notEmpty();
  req.check('password', 'Please enter a password').notEmpty();
  req.check('password', 'Passwords are not the same').equals(req.body.cpassword);
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
  } else {
    var mod = new userModel(req.body);
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          data: "Record has been inserted..!!"
        });
      }
    });
  }
})

app.post("/api/CreateCompany", function (req, res) {
  req.check('email', 'Invalid Email address').isEmail();
  req.check('name', 'Please enter company name').notEmpty();
  req.check('password', 'Please enter a password').notEmpty();
  req.check('password', 'Passwords are not the same').equals(req.body.cpassword);
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
  } else {
    var mod = new companyModel(req.body);
    mod.save(function (err, data) {
      if (err) {
        res.send(err);
      } else {
        res.send({
          data: "Record has been inserted..!!"
        });
      }
    });
  }
})

app.post("/api/SaveJob", function (req, res) {
  req.check('title', 'Please enter title').notEmpty();
  req.check('type', 'Please enter type').notEmpty();
  req.check('salary', 'Salary must be positive').isInt({ gt: 0 });
  var errors = req.validationErrors();
  if (errors) {
    res.send(errors);
  } else {
    var mod = new jobModel(req.body);
    if (req.body.mode == "Save") {
      mod.save(function (err, data) {
        if (err) {
          res.send(err);
        } else {
          res.send({
            data: "Record has been Inserted..!!"
          });
        }
      });
    } else {
      jobModel.findByIdAndUpdate(req.body.id, {
          title: req.body.name,
          type: req.body.type,
          salary: req.body.salary,
          companyId: req.body.companyId
        },
        function (err, data) {
          if (err) {
            res.send(err);
          } else {
            res.send({
              data: "Record has been Updated..!!"
            });
          }
        });
    }
  }
})

app.post("/api/apply", function (req, res) {
  var mod = new applyModel(req.body);
  mod.save(function (err, data) {
    if (err) {
      res.send('error');
    } else {
      res.send({
        data: "Record has been Inserted..!!"
      });
    }
  });
})

app.get("/api/UserAppliedJobs", function (req, res) {
  jobModel.find({}).then(
    data => {
      for (let job of data) {
        applyModel.find({
          userId: req.query.userId,
          jobId: job.id
        }).then(app => {
          job.applied = true;
        })
      }
      res.send(data);
    }
  )
})

app.post("/api/deleteUser", function (req, res) {
  userModel.remove({
    _id: req.body.id
  }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: "Record has been Deleted..!!"
      });
    }
  });
})

app.post("/api/deleteCompany", function (req, res) {
  companyModel.remove({
    _id: req.body.id
  }, function (err) {
    if (err) {
      res.send(err);
    } else {
      res.send({
        data: "Record has been Deleted..!!"
      });
    }
  });
})

app.get("/api/isUser", function (req, res) {
  userModel.findOne({
    email: req.query.email
  }).then(data => {
    return res.send(data !== null ? true : false);
  }).catch(err => {
    return res.send(err);
  })
})

app.get("/api/getUser", function (req, res) {
  userModel.findOne({
    email: req.query.email
  }).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
})

app.get("/api/isCompany", function (req, res) {
  companyModel.findOne({
    email: req.query.email
  }).then(data => {
    return res.send(data !== null ? true : false);
  }).catch(err => {
    return res.send(err);
  })
})

app.get("/api/getCompany", function (req, res) {
  companyModel.findOne({
    email: req.query.email
  }).then(data => {
    return res.send(data);
  }).catch(err => {
    return res.send(err);
  })
})

app.get("/api/getAllUsers", function (req, res) {
  userModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get("/api/getCompanies", function (req, res) {
  companyModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      res.send(data);
    }
  });
})

app.get("/api/getJobs", function (req, res) {
  jobModel.find({}, function (err, data) {
    if (err) {
      res.send(err);
    } else {
      for(let item of data) {
        companyModel.findOne({
          fId: item.companyId
        }).then(res => item.company = res);
      }
      res.send(data);
    }
  });
})


app.listen(3000, function () {
  console.log('Seekers listening on port 3000!')
})
