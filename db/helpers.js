const db = require('./index.js');
const mongoose = require('mongoose');


// saves new user to db with empty apps array
let saveNewUser = (user, callback) => {
  let newUser = new db.User({
    _id: new mongoose.Types.ObjectId(),
    username: user.username || user.googleId,
    googleId: user.googleId,
    sessionID: user.sessionID,
    email: user.email,
    password: user.password,
    apps: []
  });
  newUser.save((err, user) => {
    if (err) {
      console.log('user save error', err);
    } else {
      callback(null, user);
    }
  });
}

// currently allows duplicate apps to be saved
let saveApp = (app, callback) => {
  db.User.findOne({ googleId: app.user })
    .then((user) => {
      user.apps.push({
        date: app.dateApplied,
        position: app.position,
        company: app.company,
        contact: {
          name: app.contact.name,
          position: app.contact.position,
          email: app.contact.email,
          phone: app.contact.phone
        },
        contactDate: app.lastContactDate,
        checklist: {
          researched: app.checklist.researched,
          reachedOut: app.checklist.reachedOut,
          sentNote: app.checklist.sentNote,
          networked: app.checklist.networked
        },
        status: app.status
        });
        user.save().then(() => {
          db.User.findOne({ googleId : app.user })
          .then((user) => callback(null, user))
        })
    });
};



  /*
  let newApp = new db.App ({
    _user: app.user_id, //how to grab userid
    date: app.dateApplied,
    position: app.position,
    company: app.company,
    contact: {
      name: app.contact.name,
      position: app.contact.position,
      email: app.contact.email,
      phone: app.contact.phone
    },
    contactDate: app.lastContactDate,
    checklist: {
      researched: app.checklist.researched,
      reachedOut: app.checklist.reachedOut,
      sentNote: app.checklist.sentNote,
      networked: app.checklist.networked
    },
    status: app.status
  });
  newApp.save(function(err, app) {
    if (err) {
      console.log('app db save error', err);
      callback(err, null);
    } else {
      db.findOne({ _id: app._user }).apps.push(app).save(callback(null, app));
      console.log('app db save success', app);
      //callback(null, app);
    }
  });
}
*/

let updateApp = (app, callback) => {
  //db.User.find( { googleId: googleId }, { apps: { $elemMatch: { _id: app._id } } })
  App
  .findOne({ _id: app._id })
  .exec((err, updatedApp) => {
    if (err) {
      console.log('error updating app: ', err)
    } else {
      callback(updatedApp);
    }
  })
};


let getApplications = (userId, callback) => {
  db.User.find({ googleId: userId })
  .then((user) => {
    callback(null, user[0].apps)
  })
  .catch((err) => {
    callback(err, null);
  })
};

let findOrCreateUser = (query, callback) => {
  db.User.findOne({ googleId: query.googleId }, (err, user) => {
    //if user not found
    if (!user) {
      //save new
      saveNewUser(query, (err, user) => {
        if (err) {
          console.log('error saving user: ', err);
        } else {
          callback(null, user);
        }
      });
    } else {
      db.User.findOneAndUpdate({ username: user.username }, { sessionID: query.sessionID }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log('error saving in findOrCreate: ', err);
        } else {
          callback(null, updatedUser);
        }
      });
    }
  });
}

module.exports.getApplications = getApplications;
module.exports.saveUser = saveNewUser;
module.exports.saveApp = saveApp;
module.exports.findOrCreateUser = findOrCreateUser;
