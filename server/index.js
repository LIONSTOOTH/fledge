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

app.set('port', process.env.PORT || 2000);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '/../dist/')));
app.use(bodyParser.json());
app.use(
  expressSession({
    secret: 'shhhh',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    // lookup or create a new user using the googleId (no associated username or password)
    (accessToken, refreshToken, profile, done) => {
      helpers.findOrCreateUser(
        {
          username: profile.displayName,
          photoUrl: profile.photos[0].value,
          googleId: profile.id,
          sessionID: profile.sessionID,
        },
        (err, user) => done(err, user)
      );
    }
  )
);

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
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/plus.login',
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/calendar',
    ],
  })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/');
  }
);

app.post('/api/applications', (req, res) => {
  var userId = req.user.googleId;
  console.log('post request', req.body);

  // if request is for adding new
  if (req.body.newApplication !== undefined) {
    console.log('add application post request');
    helpers.saveApp(userId, req.body.newApplication, (err, userApps) => {
      if (err) {
        console.log('Error saving new:', err);
      } else {
        console.log('user response from save', userApps);
        res.send(JSON.stringify({ applications: userApps }));
      }
    });

    // if request is for edit
  } else if (req.body.edited !== undefined) {
    console.log('edit application post request');
    helpers.updateApp(userId, req.body.edited, (err, updatedAppList) => {
      if (err) {
        console.log('Error updating: ', err);
      } else {
        res.send(JSON.stringify({ applications: updatedAppList }));
      }
    });
  }
});

app.get('/api/applications', (req, res) => {
  // get applications for specific user
  helpers.getApplications(req.user.googleId, (err, apps) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ applications: apps }));
    }
  });
});

app.get('/logged', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.isAuthenticated());
  }
});

app.listen(app.get('port'), () =>
  console.log('app running on port', app.get('port'))
);

// [
//   {
//     "user": "105255441500267599698",
//     "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
//     "position": "Software Engineer",
//     "company": "Facebook",
//     "contact": {
//       "name": "Bob Smith",
//       "position": "Engineer",
//       "email": "bs@facebook.com",
//       "phone": "917-123-4567"
//     },
//     "checklist": {
//       "researched": "true",
//       "reachedOut": "true",
//       "sentNote": "true",
//       "networked": "true"
//     },
//     "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
//     "status": "Applied"
//   },
//   {
//     "user": "105255441500267599698",
//     "dateApplied": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
//     "position": "Software Engineer",
//     "company": "Google",
//     "contact": {
//       "name": "Bob Smith",
//       "position": "Engineer",
//       "email": "bs@google.com",
//       "phone": "917-123-4567"
//     },
//     "checklist": {
//       "researched": "true",
//       "reachedOut": "true",
//       "sentNote": "true",
//       "networked": "true"
//     },
//     "lastContactDate": "Fri Dec 08 2017 02:20:35 GMT-0500 (EST)",
//     "status": "Applied"
//   }
//   ].forEach((app) => {
//     helpers.saveApp(app, (err, a) => {
//       if (err) {
//         console.log(err)
//       } else {
//         console.log(a, ' saved')
//       }
//     })
//   });

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
