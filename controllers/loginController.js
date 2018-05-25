//Get Controller Dependancies

var config = require("../config");
var express = require("express");
var routes = express.Router();
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = require("../models/usersModel");


// Set up Login Strategies

passport.use(
  new LocalStrategy(
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


passport.use(
  new GoogleStrategy({
      clientID: config.GoogleOAuth.ClientId,
      clientSecret: config.GoogleOAuth.ClientSecret,
      callbackURL: config.GoogleOAuth.CallBackURL
    },
    function(token, tokenSecret, profile, done) {
      
        User
            .findOne({ googleId: profile.id })
            .then( user => {
                if (user){
                    done(null, user);
                } else {
                    new User({
                        googleId: profile.id,
                        name : profile.displayName,
                        email : profile.emails[0].value, 
                    })
                    .save(err, user => { done(err, user) })
                    
                }
            });
    }
  )
);

passport.serializeUser( (user, done) => {
    done(null, user.id);
});

passport.deserializeUser( (id, done) => {
    User.findById(id)
        .then( user => {
            done(null, user);
        });
});
// Define Routes

routes.get("/", (req, res) => {
    res.render('login');
});

routes.post("/local", passport.authenticate('local'), (req, res) => {
    console.log(req);
});

routes.get('/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    } ) 
);

routes.get('/auth/google/callback', passport.authenticate('google'), (req, res) => {
    // if (res.user)
    
    res.redirect('/accounts/my-account');
});


//export routes

module.exports = routes;