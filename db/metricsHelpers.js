const db = require('./index.js');
const Promise = require('bluebird');

// get average total number of applications in each category, each month
// data = [
//   [11, 2017, [3, 6, 2, 2, 0, 0]],
//   [12, 2017, [1, 7, 2, 3, 0, 0]],
// ]

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
