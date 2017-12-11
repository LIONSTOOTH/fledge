let saveUser = function(user,callback) {
  let newUser = new User({
    name: user.name,
    googleId: user.googleId,
    sessionID: user.sessionID,
    email: user.email,
    password: user.password
  });
  newUser.save(function(err, user) {
    if (err) {
      console.log('user db save error'. err);
    } else {
      console.log('user db save success');
      callback();
    }
  });
}

let saveApp = function(app, callback) {
  let newApp = new App ({
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

let saveChecklist = function(checklist, callback) {
  let newChecklist = new Checklist({
    researched: checklist.researched,
    reachedOut: checklist.reachedOut,
    sentNote: checklist.sentNote,
    networked: checklist.networked
  });
  newCheckList.save(function(err, checklist) {
    if(err) {
      console.log('checklist db save error', err);
    } else {
      console.log('checklist db save success');
    }
  });
}

let getApplications = cb => {
  App.find()
    .sort('company')
    .exec(function(error, apps) {
      if (error) {
        return next(error);
      } else {
        cb(apps);
      }
    });
};

let findOrCreateUser = (query, cb) => {
  User.findOne({ googleId: query.googleId }, (err, user) => {
    if (!user) {
      saveUser(query, (err2) => {
        if (err2) {
          console.log('error saving user: ', err2);
        } else {
          User.findOne(query, (err, user) => {
            cb(err, user);
          });
        }
      });
    } else {
      User.findOneAndUpdate({ username: user.username }, { sessionID: query.sessionID }, { new: true }, (err, updatedUser) => {
        if (err) {
          console.log('error saving in findOrCreate: ', err);
        }
        console.log('updated User: ', updatedUser);
        cb(err, user);
      });
    }
  });
}

module.exports.getApplications = getApplications;
module.exports.saveUser = saveUser;
module.exports.saveApp = saveApp;
module.exports.saveChecklist = saveChecklist;
module.exports.findOrCreateUser = findOrCreateUser;
