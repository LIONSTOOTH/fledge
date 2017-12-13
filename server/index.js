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
  ((accessToken, refreshToken, profile, done) => {
    console.log('profile is: ', profile);
    helpers.findOrCreateUser(
      {
        username: profile.displayName,
        photoUrl: profile.photos[0].value,
        googleId: profile.id,
        sessionID: profile.sessionID,
      },
      ((err, user) => {
        console.log('after findOrCreateUser, user : ', user);
        return done(err, user);
      })
    );
  })
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id, (err, user) => {
    done(null, user);
  });
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/calendar'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

// adding an application MUST have userId
app.post('/api/applications', (req, res) => {
  helpers.saveApp(req.body, (apps) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ applications: apps }));
  });
});

app.get('/api/applications', (req, res) => {
  console.log('get called req:', req.user.googleId)
  // get applications for specific user
  helpers.getApplications(req.user.googleId, (err, apps) => {
    if (err) {
      console.log(err);
    } else {
      //res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(JSON.stringify({ applications: apps }))
    }
  });
});

// app.get('/dashboard', function(req, res) {
//   res.render('index', {'loggedIn': true}, function(err, html) {
//   res.send(html);
// });
//   });
app.get('/logged', (req, res) => {
  console.log('/logged request: ', req.body)
  if (req.isAuthenticated()) {
    console.log(req.session);
    res.send(req.isAuthenticated());
    // need to send back user obj and attach _id to state
  }
});


[
  {
    "user": "105255441500267599698",
    "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
    "position": "Software Engineer",
    "company": "Facebook",
    "contact": {
      "name": "Bob Smith",
      "position": "Engineer",
      "email": "bs@facebook.com",
      "phone": "917-123-4567"
    },
    "checklist": {
      "researched": "true",
      "reachedOut": "true",
      "sentNote": "true",
      "networked": "true"
    },
    "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
    "status": "Applied"
  },
  {
    "user": "105255441500267599698",
    "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
    "position": "Software Engineer",
    "company": "Google",
    "contact": {
      "name": "Bob Smith",
      "position": "Engineer",
      "email": "bs@google.com",
      "phone": "917-123-4567"
    },
    "checklist": {
      "researched": "true",
      "reachedOut": "true",
      "sentNote": "true",
      "networked": "true"
    },
    "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
    "status": "Applied"
  }
  ].forEach((app) => {
    helpers.saveApp(app, (err, a) => {
      if (err) {
        console.log(err)
      } else {
        console.log(a, ' saved')
      }
    })
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
