var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

// load up models
var Company = require('../models/company');
var User = require('../models/user');
var Admin = require('../models/admin');
var config = require('../config/database'); // get secret

module.exports = function(passport) {
  var com_opts = {}, user_opts = {}, admin_opts = {};

  // strategy for company
  com_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(config.passportScheme);
  com_opts.passReqToCallback = true;
  com_opts.secretOrKey = config.secretCompany;

  passport.use('jwt-company',new JwtStrategy(com_opts, function(req,jwt_payload, done) {
    console.log(jwt_payload);
    Company.findOne({_id: jwt_payload._id}, function(err, company) {
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

  // strategy for user
  user_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(config.passportScheme);
  user_opts.passReqToCallback = true;
  user_opts.secretOrKey = config.secretUser;

  passport.use('jwt-user',new JwtStrategy(user_opts, function(req,jwt_payload, done) {
    console.log(jwt_payload);
    User.findOne({_id: jwt_payload._id}, function(err, user) {
          if (err) {
              return done(err, false);
          }
          if (user) {
              req.user = user;
              done(null, user);
          } else {
              done(null, false);
          }
      });
  }));

  //strategy for admin
  admin_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme(config.passportScheme);
  admin_opts.passReqToCallback = true;
  admin_opts.secretOrKey = config.secretAdmin;

  passport.use('jwt-admin',new JwtStrategy(admin_opts, function(req,jwt_payload, done) {
    console.log(jwt_payload);
    Admin.findOne({_id: jwt_payload._id}, function(err, admin) {
          if (err) {
              return done(err, false);
          }
          if (admin) {
              req.admin = admin;
              done(null, admin);
          } else {
              done(null, false);
          }
      });
  }));
};