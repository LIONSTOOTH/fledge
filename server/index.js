const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const logout = require('express-passport-logout');
const expressSession = require('express-session');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleAuth = require('google-auth-library');
const google = require('googleapis');
let oauth2Client;
const fs = require('fs');
const db = require('../db/index.js');
const helpers = require('../db/helpers.js');
const metricsHelpers = require('../db/metricsHelpers.js');

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
      callbackURL:
        process.env.LOCAL_GOOGLE_REDIRECT ||
        'https://fledge.herokuapp.com/auth/google/callback',
    },
    // lookup or create a new user using the googleId (no associated username or password)
    (accessToken, refreshToken, profile, done) => {
      let clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      let clientId = process.env.GOOGLE_CLIENT_ID;
      let redirectUrl =
        process.env.LOCAL_GOOGLE_REDIRECT ||
        'https://fledge.herokuapp.com/auth/google/callback';
      let auth = new googleAuth();
      oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
      let tokenObj = { access_token: accessToken, refresh_token: refreshToken };
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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '../dist/index.html');
});

app.get('/api/metrics', (req, res) => {
  // to get main bar chart metrics
  metricsHelpers.getAppsByStatus(req.user.googleId, (err, data) => {
    if (err) {
      console.log('Error getting metrics:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ metrics: data }));
    }
  });
});

app.post('/api/applications', (req, res) => {
  var userId = req.user.googleId;

  // if request is for edit
  if (req.body.edited !== undefined) {
    helpers.updateApp(userId, req.body.edited, (err, updatedUser) => {
      if (err) {
        console.log('Error updating app: ', err);
        res.send(500);
      } else {
        res.send(JSON.stringify({ applications: updatedUser.apps }));
      }
    });

    // if request is for adding new
  } else if (req.body.newApplication !== undefined) {
    helpers.saveApp(userId, req.body.newApplication, (err, appId) => {
      if (err) {
        console.log('Error adding new app:', err);
        res.send(500);
      } else {
        res.send(JSON.stringify({ _id: appId }));
      }
    });
    // if request is to delete
  } else if (req.body.removeApplication !== undefined) {
    helpers.deleteApp(userId, req.body.removeApplication, req.body.rejected, oauth2Client, (err, user) => {
      if (err) {
        console.log('Error deleting application', err);
        res.send(500);
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
      console.log('Error getting apps:', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ applications: apps }));
    }
  });
});

app.post('/api/contacts', (req, res) => {
  // if an app id has been provided
  if (req.body.addContact.contact._id) {
    helpers.saveContactToExistingApp(req.user.googleId, req.body.addContact, (err, user) => {
      if (err) {
        console.log('Error adding contact: ', err);
        res.send(500);
      } else {
        res.send(JSON.stringify({ contacts: user.contacts }));
      }
    });
  }
});

app.get('/api/contacts', (req, res) => {
  // get contacts for specific user
  helpers.getContacts(req.user.googleId, (err, allContacts) => {
    if (err) {
      console.log('Error getting contacts: ', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ contacts: allContacts }));
    }
  });
});

app.delete('/api/contacts', (req, res) => {
  // delete contact for specific user
  helpers.deleteContact(req.user.googleId, req.query.id, (err, allContacts) => {
    if (err) {
      console.log('Error deleting contact: ', err);
      res.send(500);
    } else {
      res.send(JSON.stringify({ contacts: allContacts.contacts }));
    }
  });
});


app.get('/api/reminders', (req, res) => {
  // get reminders for specific user
  helpers.getReminders(req.user.googleId, (err, reminders) => {
    if (err) {
      console.log('Error getting reminders:', err);
      res.sendStatus(500);
    } else {
      res.send(JSON.stringify(reminders));
    }
  });
});

app.post('/api/appReminders', (req, res) => {
  let allReminders = req.user.reminders;
  let id = req.body.appId;
  filteredReminders = allReminders.filter(function(reminder) {
    return reminder.applicationId === id
  })
  res.send(filteredReminders);
})

app.post('/api/deleteReminder', (req, res) => {
  var params = {
        auth: oauth2Client,
        calendarId: 'primary',
        eventId: req.body.eventId,
      };
  let calendar = google.calendar('v3');
  calendar.events.delete(params, function(err) {
    if (err) {
      console.log('The API returned an error: ' + err);
    } else {
      console.log('Event deleted in calendar');
    }
  });

  helpers.deleteReminder(req.user.googleId, req.body.reminderId, (err, remind) => {
    if (err) {
      console.log('Error deleting reminder:', err);
      res.send(500);
    } else {
      res.send(200);
    }
  });
});

app.get('/logged', (req, res) => {
  if (req.isAuthenticated()) {
    res.send(req.isAuthenticated());
  } else {
    res.send(req.isAuthenticated());
  }
});

app.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.post('/api/reminders', (req, res) => {
  let userId = req.user.googleId;

  let startDate = req.body.addReminder.start
    .split('')
    .slice(0, 10)
    .join('');

  let event = {
    summary: req.body.addReminder.summary,
    description: req.body.addReminder.description + ' https://fledge.herokuapp.com/',
    start: {
      dateTime: startDate + 'T06:00:00-08:00',
    },
    end: {
      dateTime: startDate + 'T08:00:00-08:00',
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 1 },
        { method: 'popup', minutes: 1 },
      ],
    },
  };

  let calendar = google.calendar('v3');

  calendar.events.insert(
    {
      auth: oauth2Client,
      calendarId: 'primary',
      resource: event,
    },
    function(err, event) {
      if (err) {
        console.log(
          'There was an error contacting the Calendar service: ' + err
        );
        return;
      }
      req.body.addReminder.eventId = event.id;
      helpers.saveReminder(userId, req.body.addReminder, err => {
        if (err) {
          console.log('Error saving reminder:', err);
        } else {
          console.log('Reminder Saved Event ID: ' + req.body.addReminder.eventId);
          helpers.getApplications(req.user.googleId, (err, apps) => {
            if (err) {
              console.log(err);
            } else {
              res.send(JSON.stringify({ applications: apps }));
            }
          });
        }
      });
      console.log('Event created: %s', event.htmlLink + ' event' + event + '' + req.body.addReminder);
    }
  );
});

app.listen(app.get('port'), () =>
  console.log('app running on port', app.get('port'))
);
