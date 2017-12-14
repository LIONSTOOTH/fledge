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
  });
  newUser.save((err, savedUser) => {
    if (err) {
      console.log('user save error', err);
    } else {
      callback(null, savedUser);
    }
  });
};

const saveApp = function(userId, app, callback) {
  db.User.findOne({ googleId: userId }).then(user => {
    console.log('found user:', user);
    user.apps.push({
      date: app.date,
      position: app.position,
      company: app.company,
      contact: {
        name: app.contact ? app.contact.name : null,
        position: app.contact ? app.contact.position : null,
        email: app.contact ? app.contact.email : null,
        phone: app.contact ? app.contact.phone : null,
      },
      contactDate: app.lastContactDate,
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
  console.log('update app called')
  db.User.findOneAndUpdate(
    {  googleId: userId, 'apps._id': app._id },
    { $set: {
      //do keys have to be in quotes?
      'apps.date': app.date,
      'apps.position': app.position,
      'apps.company': app.company,
      'apps.contact': {
        'apps.name': app.contact,
        'apps.position': app.contact,
        'apps.email': app.contact,
        'apps.phone': app.contact,
      },
      'apps.contactDate': app.lastContactDate,
      'apps.checklist': {
        'apps.researched': app.checklist,
        'apps.reachedOut': app.checklist,
        'apps.sentNote': app.checklist,
        'apps.networked': app.checklist,
      },
      'apps.status': app.status, //required field
    }
  })
  .then((user) => {
    console.log('user after update', user)
    callback(null, user)
  })
};

//   db.User.find({ googleId: userId }, { apps: { $elemMatch: { _id: app._id } } })
//     .then(retrievedApp => {
//       console.log('app found in db:', retrievedApp);
//      // saveApp(userId, retrievedApp, callback);
//     })
//     .catch(err => {
//       callback(err, null);
//     });
// };

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
