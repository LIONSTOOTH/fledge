const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../db/index.js');
const helpers = require('../db/helpers.js');

const app = express();

require('dotenv').config();

app.set('port', (process.env.PORT || 2000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../dist/')));
app.use(bodyParser.json());
app.use(expressSession({
  secret: 'shhhh',
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback',
    proxy: true,
  },
  // lookup or create a new user using the googleId (no associated username or password)
  (accessToken, refreshToken, profile, done) => {
    console.log('profile is: ', profile);
    helpers.findOrCreateUser(
      {
        username: profile.displayName,
        photoUrl: profile.photos[0].value,
        googleId: profile.id,
        sessionID: profile.sessionID,
      },
      (err, user) => {
        console.log('after findOrCreateUser, user : ', user);
        return done(err, user);
      },
    );
  }, // why is the sessionId null
));

passport.serializeUser((user, done) => {
  console.log('user in serialize: ', user);
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  console.log('id in deserialize: ', id);
  db.User.findById(id, (err, user) => {
    done(null, user);
  });
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'] }),
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  },
);


app.post('/api/applications', (req, res) => {
  helpers.saveApp(req.body, (application) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ applications: application }));
  });
});

app.get('/api/applications', (req, res) => {
  helpers.getApplications((apps) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ applications: apps }));
  });
});

// app.get('/dashboard', function(req, res) {
//   res.render('index', {'loggedIn': true}, function(err, html) {
//   res.send(html);
// });
//   });
app.get('/logged', (req, res) => {
  console.log('is authenticated?', req.isAuthenticated());
  console.log(req.session);
  res.send(req.isAuthenticated());
});

/*
// need to refactor client side logout
app.get('/logout', (req, res) => {
  console.log("LOGOUT CALLED SERVER")
  req.session.destroy((err) => {
    if (err) {
      console.log('error on logout: ', err);
      res.send(false);
    } else {
      res.send(true);
    }
  });
});
*/

// app.get('*', function(req, res) {
//   res.render
// })

app.listen(app.get('port'), () =>	console.log('app running on port', app.get('port')));
