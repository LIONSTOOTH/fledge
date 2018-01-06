const db = require('./index.js');
const mongoose = require('mongoose');
const Promise = require('bluebird');
const google = require('googleapis');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const googleAuth = require('google-auth-library');

// saves new user to db with empty apps array
const saveNewUser = (user, callback) => {
  const newUser = new db.User({
    _id: new mongoose.Types.ObjectId(),
    username: user.username || user.googleId,
    googleId: user.googleId,
    sessionID: user.sessionID,
    email: user.email,
    rejected: 0,
    password: user.password,
    apps: [],
    reminders: [],
    contacts: [],
  });
  newUser.save((err, savedUser) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, savedUser);
    }
  });
};

const saveReminder = (userId, reminder, callback) => {
  db.User.findOne({ googleId: userId }).then((user) => {
    user.reminders.push(reminder);
    user.save((err, r) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, r);
      }
    });
  });
};

const getReminders = (userId, callback) => {
  db.User.findOne({ googleId: userId })
    .then(user => callback(null, user.reminders))
    .catch(err => callback(err, null));
};

const deleteReminder = (userId, reminderId, callback) => {
  db.User.findOne({ googleId: userId })
    .then((user) => {
      for (let i = 0; i < user.reminders.length; i++) {
        // has to be double equals
        if (user.reminders[i]._id == reminderId) {
          user.reminders.splice(i, 1);
          user.save((err) => {
            if (err) {
              callback(err, null);
            } else {
              callback(null);
            }
          });
        }
      }
    })
    .catch(err => callback(err, null));
};

const saveContactToExistingApp = (userId, appContact, callback) => {
  // find user
  db.User.findOne({ googleId: userId }).then((user) => {
    // push new contact document to user contacts array
    user.contacts.push(new db.Contact({
      position: appContact.contact.position,
      company: appContact.contact.company,
      email: appContact.contact.email,
      name: appContact.contact.name,
      phone: appContact.contact.phone,
      applicationId: appContact.contact._id,
    }));
    user.save((err, contact) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, contact);
      }
    });
  });
};

const getContacts = (userId, callback) => {
  db.User.findOne({ googleId: userId })
    .then(user => callback(null, user.contacts))
    .catch(err => callback(err, null));
};


const deleteContact = (userId, contactId, callback) => {
  db.User.findOne({ googleId: userId }, (err, data) => {
    const c = data.contacts.id(contactId);
    c.remove();
    data.save((error, saved) => {
      if (err) {
        callback(error, null);
      } else {
        callback(null, saved);
      }
    });
  });
};

const saveApp = (userId, app, callback) => {
  db.User.findOne({ googleId: userId }).then((user) => {
    user.apps.push(new db.App({
      status: 'new',
    }));
    user.save().then((u) => {
      for (let i = 0; i < u.apps.length; i++) {
        if (u.apps[i].status === 'new') {
          callback(null, u.apps[i]._id);
          return;
        }
      }
      callback('Error getting new app id', null);
    });
  });
};

const updateApp = (userId, app, callback) => {
  db.User.findOne({ googleId: userId }, (err, data) => {
    const a = data.apps.id(app._id);
    a.date = app.date;
    a.position = app.position;
    a.company = app.company;
    a.companyImg = app.companyImg;
    a.contactDate = app.lastContactDate;
    a.postUrl = app.postUrl;
    a.postDescription = app.postDescription;
    a.notes = app.notes;
    a.checklist = {
      researched: app.checklist ? app.checklist.researched : null,
      reachedOut: app.checklist ? app.checklist.reachedOut : null,
      sentNote: app.checklist ? app.checklist.sentNote : null,
      networked: app.checklist ? app.checklist.networked : null,
    },
    a.status = app.status;
    data.save((error, saved) => {
      if (err) {
        callback(error, null);
      } else {
        callback(null, saved)
      }
    });
  });
};

const deleteApp = (userId, appId, rejected, oAuth, callback) => {
  db.User.findOne({ googleId: userId })
    .then((user) => {
      Promise.each(user.reminders, (r) => {
        // find any reminders linked to this appId
        if (r.applicationId === appId) {
          // remove from google cal too
          const params = {
            auth: oAuth,
            calendarId: 'primary',
            eventId: r.eventId,
          };
          const calendar = google.calendar('v3');
          calendar.events.delete(params, (err) => {
            if (err) {
              console.log('Calendar API returned an error:', err);
            }
          });
          r.remove();
        }
      }).then((origR) => {
        Promise.each(user.contacts, (c) => {
          // find any contacts linked to this appId
          if (c.applicationId === appId) {
            c.remove();
          }
        }).then((origC) => {
          if (rejected) {
            user.rejected = user.rejected + 1 || 1;
          }
          Promise.each(user.apps, (a) => {
            // appId comparison only works with double
            if (a._id == appId) {
              a.remove();
            }
          }).then((origA) => {
            user.save((err, updatedUser) => {
              if (err) {
                callback(err, null);
              } else {
                callback(null, updatedUser);
              }
            });
          });
        });
      });
    });
};


const getApplications = (userId, callback) => {
  db.User.findOne({ googleId: userId })
    .then(user => callback(null, user.apps))
    .catch(err => callback(err, null));
};

const findOrCreateUser = (query, callback) => {
  db.User.findOne({ googleId: query.googleId }, (err, user) => {
    // if user not found
    if (!user) {
      // save new
      saveNewUser(query, (saveErr, savedUser) => {
        if (err) {
          callback(saveErr, null);
        } else {
          callback(null, savedUser);
        }
      });
    } else {
      db.User.findOneAndUpdate(
        { googleId: query.googleId },
        { sessionID: query.sessionID },
        { new: true },
        (updateUserErr, updatedUser) => {
          if (err) {
            callback(updatedUser, null);
          } else {
            callback(null, updatedUser);
          }
        }
      );
    }
  });
};

module.exports.getApplications = getApplications;
module.exports.saveUser = saveNewUser;
module.exports.saveApp = saveApp;
module.exports.updateApp = updateApp;
module.exports.findOrCreateUser = findOrCreateUser;
module.exports.saveReminder = saveReminder;
module.exports.getReminders = getReminders;
module.exports.saveContactToExistingApp = saveContactToExistingApp;
module.exports.getContacts = getContacts;
module.exports.deleteReminder = deleteReminder;
module.exports.deleteApp = deleteApp;
module.exports.deleteContact = deleteContact;
