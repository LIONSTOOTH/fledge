const db = require('./index.js');
const mongoose = require('mongoose');

// saves new user to db with empty apps array
const saveNewUser = (user, callback) => {
  const newUser = new db.User({
    _id: new mongoose.Types.ObjectId(),
    username: user.username || user.googleId,
    googleId: user.googleId,
    sessionID: user.sessionID,
    email: user.email,
    password: user.password,
    apps: [],
    reminders: [],
    contacts: [],
  });
  newUser.save((err, savedUser) => {
    if (err) {
      console.log('user save error', err);
    } else {
      callback(null, savedUser);
    }
  });
};

const saveReminder = (userId, reminder, callback) => {
  console.log('saving reminder: ' + reminder + ' for userId: ' + userId)
  db.User.findOne({ googleId: userId }).then(user => {
    user.reminders.push(reminder);
    user.save((err, reminder) => {
      if (err) {
        console.log('reminder db save error', err);
        callback(err, null);
      } else {
        console.log('reminder db save success', reminder);
        callback(null, reminder);
      }
    });
  });
}

const getReminders = (userId, callback) => {
  db.User.find({ googleId: userId })
    .then(user => {
      callback(null, user[0].reminders);
    })
    .catch(err => {
      callback(err, null);
    });
};

const deleteReminder = (userId, reminderId, callback) => {

  db.User.find({ googleId: userId })
    .then(user => {
      for (let i = 0; i < user[0].reminders.length; i ++) {
        console.log(user[0].reminders[i]._id + ' uhh ' + reminderId)
        if (user[0].reminders[i]._id == reminderId) {
          console.log('MATCHED!!!!!!!!!')
          user[0].reminders.splice(i, 1);
          user[0].save((err) => {
            if (err) {
              console.log('reminder db save error', err);

            } else {
              console.log('reminder db save success');

            }
          });
  // db.Reminder.findByIdAndRemove(reminderId, function(){console.log('done')});
        }
      }
      // console.log(user[0].reminders)
    })
    .catch(err => {
      callback(err, null);
    });
}

const saveContactToExistingApp = (userId, appContact, callback) => {
  console.log('saving contact in helpers: ',appContact)
  // find user
  db.User.findOne({ googleId: userId }).then(user => {
    // push new contact document to user contacts array
    user.contacts.push(
      new db.Contact({
        position: appContact.contact.position,
        company: appContact.contact.company,
        email: appContact.contact.email,
        name: appContact.contact.name,
        phone: appContact.contact.phone,
        applicationId: appContact.contact._id,
      })
    );
    user.save((err, contact) => {
      if (err) {
        console.log('contact db save error', err);
        callback(err, null);
      } else {
        console.log('contact db save success', contact);
        callback(null, contact);
      }
    });
  });
}

const getContacts = (userId, callback) => {
  db.User.find({ googleId: userId })
    .then(user => {
      callback(null, user[0].contacts);
    })
    .catch(err => {
      callback(err, null);
    });
};

const saveApp = (userId, app, callback) => {
  db.User.findOne({ googleId: userId }).then(user => {
    user.apps.push({
      date: app.date,
      position: app.position,
      company: app.company,
      companyImg: app.companyImg,
      contactDate: app.lastContactDate,
      postUrl: app.postUrl,
      postDescription: app.postDescription,
      notes: app.notes,
      checklist: {
        researched: app.checklist ? app.checklist.researched : null,
        reachedOut: app.checklist ? app.checklist.reachedOut : null,
        sentNote: app.checklist ? app.checklist.sentNote : null,
        networked: app.checklist ? app.checklist.networked : null,
      },
      status: app.status,
    });
    user.save((err, app) => {
      if (err) {
        console.log('app db save error', err);
        callback(err, null);
      } else {
        console.log('app db save success', app);
        callback(null, app);
      }
    });
  });
};

const updateApp = (userId, app, callback) => {
  db.User.findOne({ googleId: userId }, (err, data) => {
    var a = data.apps.id(app._id);
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
      }
    a.status = app.status;
    data.save((err, saved) => {
      if (err) {
        callback(err, null);
      } else {
        callback(null, data)
      }
    });
  });
};


const getApplications = (userId, callback) => {
  db.User.find({ googleId: userId })
    .then(user => {
      callback(null, user[0].apps);
    })
    .catch(err => {
      callback(err, null);
    });
};

const findOrCreateUser = (query, callback) => {
  db.User.findOne({ googleId: query.googleId }, (err, user) => {
    // if user not found
    if (!user) {
      // save new
      saveNewUser(query, (saveErr, savedUser) => {
        if (err) {
          console.log('error saving user: ', err);
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
            console.log('error updating user: ', err);
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
