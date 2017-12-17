const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const expressSession = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const db = require('../db/index.js');
const helpers = require('../db/helpers.js');
var googleAuth = require('google-auth-library');
var google = require('googleapis');
var oauth2Client;
var fs = require('fs');

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
      callbackURL: process.env.LOCAL_GOOGLE_REDIRECT || 'https://murmuring-mesa-56363.herokuapp.com/auth/google/callback',
      proxy: true,
    },
    // lookup or create a new user using the googleId (no associated username or password)
    (accessToken, refreshToken, profile, done) => {
      let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      let clientId = process.env.GOOGLE_CLIENT_ID;
      let redirectUrl = process.env.LOCAL_GOOGLE_REDIRECT || 'https://murmuring-mesa-56363.herokuapp.com/auth/google/callback';
      let auth = new googleAuth();
      oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      let tokenObj = { access_token: accessToken, refresh_token: refreshToken }
      oauth2Client.credentials = tokenObj;

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

    // if request is for edit
  if (req.body.edited !== undefined) {
    console.log('edit application post request');
    helpers.updateApp(userId, req.body.edited, (err, updatedUser) => {
      if (err) {
        console.log('Error updating: ', err);
      } else {
        res.send(JSON.stringify({ applications: updatedUser.apps }));
      }
    });

  // if request is for adding new
  } else if (req.body.newApplication !== undefined) {
    console.log('add application post request');
    helpers.saveApp(userId, req.body.newApplication, (err, user) => {
      if (err) {
        console.log('Error saving new:', err);
      } else {
        res.send(JSON.stringify({ applications: user.apps }));
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


//     console.log('setting google calendar reminder', req.body)

//     var event = {
//   'summary': 'Google I/O 2015',
//   'description': 'A chance to hear more about Google\'s developer products.',
//   'start': {
//     'dateTime': '2017-12-15T06:00:00-08:00',
//   },
//   'end': {
//     'dateTime': '2017-12-15T18:00:00-08:00',
//   },
//   'reminders': {
//     'useDefault': false,
//     'overrides': [
//       {'method': 'email', 'minutes': 1},
//       {'method': 'popup', 'minutes': 1},
//     ],
//   },
// };

// {
//   company: 'Etsy'
//   start: '2017-12-15'
//   reminder: true
//   reminderTime: 1 (or 2, for we)
// }


// var calendar = google.calendar('v3');
// calendar.events.insert({
//   auth: oauth2Client,
//   calendarId: 'primary',
//   resource: event,
// }, function(err, event) {
//   console.log('what the heck')
//   if (err) {
//     console.log('There was an error contacting the Calendar service: ' + err);
//     return;
//   }
//   console.log('Event created: %s', event.htmlLink);
// });

    res.send(req.isAuthenticated());
  } else {
    res.sendStatus(401);
  }
});



app.post('/api/reminders', (req, res) => {

  console.log('setting google calendar reminder', req.body)

  let startDate = req.body.addReminder.start.split('').slice(0, 10).join('');



  let event = {
    'summary': req.body.addReminder.summary,
    'description': 'https://murmuring-mesa-56363.herokuapp.com/',
    'start': {
      'dateTime': startDate + 'T06:00:00-08:00',
    },
    'end': {
      'dateTime': startDate + 'T08:00:00-08:00',
    },
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 1},
        {'method': 'popup', 'minutes': 1},
      ],
    },
};

  let calendar = google.calendar('v3');

  calendar.events.insert({
    auth: oauth2Client,
    calendarId: 'primary',
    resource: event,
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
      return;
    }
    console.log('Event created: %s', event.htmlLink);
  });

  helpers.getApplications(req.user.googleId, (err, apps) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify({ applications: apps }));
    }
  });


});


app.listen(app.get('port'), () =>
  console.log('app running on port', app.get('port'))
);


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
