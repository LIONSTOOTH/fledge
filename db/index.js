const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fledge');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', () => console.log('db connection success'));

let Schema = mongoose.Schema;

let userSchema = new Schema({
	username: String,
	photoUrl: String,
	googleId: String,
	sessionID: String,
	email: String,
	password: String,
	apps: [{ type: Schema.ObjectId, ref: 'App' }] //array of _.id props of users apps
});

let appSchema = new Schema({
	_user : { type: Schema.ObjectId, ref: 'User' }, //single user _.id prop
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
	checklist: {
		researched: Boolean,
		reachedOut: Boolean,
		sentNote: Boolean,
		networked: Boolean
	},
	status: String
});


let User = mongoose.model('User', userSchema);
let App = mongoose.model('App', appSchema);

module.exports.User = User;
module.exports.App = App;
