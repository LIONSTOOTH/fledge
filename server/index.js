const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let db = require('../db/index.js');
let passport = require('passport');
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;





app.set('port', (process.env.PORT || 2000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../dist/'));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: "108994268957-a7mgrj68ai43tdd89ivrsmuk4jcnhi0i.apps.googleusercontent.com",
  clientSecret: "vsKhk5EYDP7rrBnCgaZcZa7c",
  callbackURL: "/auth/google/callback",
  proxy: true
  },
  //lookup or create a new user using the googleId (no associated username or password)
  function(accessToken, refreshToken, profile, done) {
    console.log(profile);
    db.findOrCreateUser({ name: profile.displayName, googleId: profile.id, sessionID: profile.sessionID }, function (err, user) {
      return done(err, user);
    });
  }
));

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("method", req.isAuthenticated())
    res.redirect('/')
  });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.post('/api/applications', function(req,res) {
  db.saveApp(req.body, function(app) {
    res.setHeader("Content-Type", "application/json")
    res.send(JSON.stringify({ app: app }))
  });
});

app.get('/api/applications', function(req, res) {
  db.getApplications(function(apps) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ apps: apps }));
  });});

// app.get('/dashboard', function(req, res) {
//   res.render('index', {'loggedIn': true}, function(err, html) {
//   res.send(html);
// });
//   });


app.listen(app.get('port'), function() {
	console.log('app is running on port', app.get('port'));
})
