import { GoogleOAuth } from "../config";
var express = require("express");
var routes = express.Router();
var passport = require('passport');
var googleStrategy = require('passport-google-oauth20').Strategy;
var localStrategy = require('passport-local').Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

  passport.use(new GoogleStrategy({
    consumerKey: GoogleOAuth.ClientId,
    consumerSecret: GoogleOAuth.ClientSecret,
    callbackURL: "/auth/google/callback"
  },
  function(token, tokenSecret, profile, done) {
      User.findOrCreate({ googleId: profile.id }, function (err, user) {
        return done(err, user);
      });
  }
));

router.get("/", (req, res) => {
  res.render('login');
});

router.post("/local", passport.authenticate('local'), (req, res) => {
  
});