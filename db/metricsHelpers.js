const db = require('./index.js');
const Promise = require('bluebird');


const getAppsByStatus = (userId, callback) => {
  db.User.findOne({ googleId: userId }).then((user) => {
    // get totals for each status category
    const totals = {};
    totals.rejected = user.rejected || 0;
    user.apps.forEach((app) => {
      totals[app.status] ? totals[app.status] += 1 : totals[app.status] = 1;
    });
    Promise.all(user.apps).then(() => callback(null, totals))
      .catch(err => callback(err, null));
  });
};


module.exports.getAppsByStatus = getAppsByStatus;
