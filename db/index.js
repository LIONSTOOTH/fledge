const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fledge');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', function() {
	console.log('db connection success');
});

let userSchema = mongoose.Schema({
	name: String,
	googleId: String,
	sessionID: String,
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

module.exports.User = User;
module.exports.App = App;
module.exports.Checklist = Checklist;