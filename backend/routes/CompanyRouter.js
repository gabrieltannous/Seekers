var Company = require("../models/company");
const express = require('express');
const router = express.Router();
const passport = require('passport');
const {
  body,
  query,
  validationResult
} = require('express-validator/check');

//update company profile
router.post('/updateCompanyProfile',
  [
    body('name', "Name cannot be blank").not().isEmpty()
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

    var id = req.company._id;

    Company.findByIdAndUpdate(id, {
        $set: req.body
      },
      function (err, result) {
        if (err) throw err;

        if (!result) {
          res.status(400).json({
            success: false,
            msg: ['Problem occurs. Data cannot be saved']
          });
        } else {
          res.status(201).json({
            success: true,
            msg: ['Profile updated successfuly']
          });
        }
      });

  });

module.exports = router;
