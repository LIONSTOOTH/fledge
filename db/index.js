const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fledge');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', () => console.log('db connection success'));

let Schema = mongoose.Schema;


let appSchema = new Schema({
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

let userSchema = new Schema({
	username: String,
	photoUrl: String,
	googleId: { type: String, unique: true },
	sessionID: String,
	email: String,
	password: String,
	apps: [appSchema] //array of _.id props of users apps
});


/*
let userSchema = new Schema({
	_id: Schema.Types.ObjectId,
	username: String,
	photoUrl: String,
	googleId: { type: String, unique: true },
	sessionID: String,
	email: String,
	password: String,
	apps: [{ type: Schema.Types.ObjectId, ref: 'App' }] //array of _.id props of users apps
});

let appSchema = new Schema({
	_user : { type: Schema.Types.ObjectId, ref: 'User' }, //single user _.id prop
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
let App = mongoose.model('App', appSchema);
module.exports.App = App;
*/

let User = mongoose.model('User', userSchema);

module.exports.User = User;
