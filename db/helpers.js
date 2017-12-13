const db = require('./index.js');

// saves new user to db with empty apps array
let saveNewUser = (user, callback) => {
  let newUser = new User({
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

let saveApp = function(app, callback) {
  let newApp = new App ({
    _user: app.user._id, //how to grab userid
    date: app.date,
    position: app.position,
    company: app.company,
    contact: {
      name: app.company.name,
      position: app.company.position,
      email: app.company.email,
      phone: app.company.phone
    },
    contactDate: app.contactDate,
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
    } else {
      console.log('app db save success', app);
      callback(app);
    }
  });
}

let getApplications = (cb) => {
  db.App.find()
    .sort('company')
    .exec(function(error, apps) {
      if (error) {
        return next(error);
      } else {
        cb(apps);
      }
    });
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
