const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fledge');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', function() {
	console.log('db connection success');
});

let userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String
});

let appSchema = mongoose.Schema({
	date: Date,
	position: String,
	company: String,
	contact: {
		name: String,
		position: String,
		email: String,
		phone: String
	},
	contactDate: Date,
	status: String
});

let checklistSchema = mongoose.Schema({
	researched: Boolean,
	reachedOut: Boolean,
	sentNote: Boolean,
	networked: Boolean
});

let User = mongoose.model('User', userSchema);
let App = mongoose.model('App', appSchema);
let Checklist = mongoose.model('Checklist', checklistSchema);

let saveUser = function(user,callback) {
	let newUser = new User({
		name: user.name,
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

let saveApp = function(app,callback) {
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
	newApp.save(function(err,app) {
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
	newCheckList.save(function(err,checklist) {
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

module.exports.getApplications = getApplications;
module.exports.saveUser = saveUser;
module.exports.saveApp = saveApp;
module.exports.saveChecklist = saveChecklist;