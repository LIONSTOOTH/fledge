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

const saveApp = (userId, app, callback) => {
  db.User.findOne({ googleId: userId })
    // push app document to user's apps array
    .then((user) => {
      user.apps.push({
        date: app.dateApplied,
        position: app.position,
        company: app.company,
        contact: {
          name: app.contact.name,
          position: app.contact.position,
          email: app.contact.email,
          phone: app.contact.phone,
        },
        contactDate: app.lastContactDate,
        checklist: {
          researched: app.checklist.researched,
          reachedOut: app.checklist.reachedOut,
          sentNote: app.checklist.sentNote,
          networked: app.checklist.networked,
        },
        status: app.status,
      });
      // confirm save by finding saved user
      user.save().then(() => {
        db.User.findOne({ googleId: app.user })
        // return all user apps
          .then(savedUser => callback(null, savedUser.apps))
          .catch(error => callback(error, null));
      });
    });
};


const updateApp = (userId, app, callback) => {
  db.User.find({ googleId: userId }, { apps: { $elemMatch: { _id: app._id } } })
    .then((retrievedApp) => {
      console.log('app found in db:', retrievedApp)
      saveApp(userId, retrievedApp, callback);
    })
    .catch((err) => {
      callback(err, null);
    });
};


const getApplications = (userId, callback) => {
  db.User.find({ googleId: userId })
    .then((user) => {
      callback(null, user[0].apps);
    })
    .catch((err) => {
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
        { new: true }, (updateUserErr, updatedUser) => {
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

/*

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

const saveApp = (userId, app, callback) => {
  console.log('save app called w/user:', userId);
  db.User.findOne({ googleId: userId })
    // push app document to user's apps array
    .then((user) => {
      console.log('user found')
      user.apps.push({
        date: app.dateApplied,
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
      })
      //.save((err) => console.log('error saving: ', err))
      //})

      // .then((updatedUser) => {
      //   console.log('updateduser: ',updatedUser)
      //   updatedUser.save()
      // })
      // .then(savedUser => {
      //   console.log(savedUser)
      //   callback(null, savedUser.apps)
      // })
      // .catch(error => callback(error, null));
      // confirm save by finding saved user
      user.save().then(() => {
        console.log('updated app and resaved user')
        db.User.findOne({ googleId: app.user })
        // return all user apps
          .then(savedUser => callback(null, savedUser.apps))
          .catch(error => callback(error, null));
      });
    });
};


const updateApp = (userId, app, callback) => {
  db.User.find({ googleId: userId }, { apps: { $elemMatch: { _id: app._id } } })
    .then((retrievedApp) => {
      console.log('app found in db:', retrievedApp)
      saveApp(userId, retrievedApp, callback);
    })
    .catch((err) => {
      callback(err, null);
    });
};


const getApplications = (userId, callback) => {
  db.User.find({ googleId: userId })
    .then((user) => {
      callback(null, user[0].apps);
    })
    .catch((err) => {
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
        { new: true }, (updateUserErr, updatedUser) => {
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
*/