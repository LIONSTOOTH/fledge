const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const db = require('../db/index.js');
const helpers = require('../db/helpers.js');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const expressSession = require('express-session');


app.set('port', (process.env.PORT || 2000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../dist/'));
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'shhhh',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",
  proxy: true
  },
  //lookup or create a new user using the googleId (no associated username or password)
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    helpers.findOrCreateUser({ name: profile.displayName, googleId: profile.id, sessionID: profile.sessionID }, function (err, user) {
      return done(err, user);
    });
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  function(req, res) {
    console.log("method", req.user)
    res.redirect('/')
  });


app.post('/api/applications', function(req,res) {
  helpers.saveApp(req.body, function(app) {
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify({ app: app }))
  });
});

app.get('/api/applications', function(req, res) {
  helpers.getApplications(function(apps) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ apps: apps }));
  });});

// app.get('/dashboard', function(req, res) {
//   res.render('index', {'loggedIn': true}, function(err, html) {
//   res.send(html);
// });
//   });
app.get('/logged', function(req, res) {
  console.log('is authenticated?', req.user)
  console.log(JSON.stringify(req.isAuthenticated))
  res.send(req.isAuthenticated())
})

// app.get('*', function(req, res) {
//   res.render
// })

app.listen(app.get('port'), function() {
	console.log('app is running on port', app.get('port'));
})
