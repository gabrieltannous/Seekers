var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up models
var Company = require('../models/company');
var config = require('../config/database'); // get secret

module.exports = function(passport) {
  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
  opts.secretOrKey = config.secretCompany;
  opts.passReqToCallback = true;

  // strategy for company
  passport.use('jwt-company',new JwtStrategy(opts, function(req,jwt_payload, done) {
    Company.findOne({id: jwt_payload.id}, function(err, company) {
          if (err) {
              return done(err, false);
          }
          if (company) {
              req.company = company;
              done(null, company);
          } else {
              done(null, false);
          }
      });
  }));
};