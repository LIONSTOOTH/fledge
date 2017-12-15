const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/fledge');
mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135486.mlab.com:35486/heroku_kgsk3z8c` || 'mongodb://localhost/fledge', { mongoUseClient: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', () => console.log('db connection success'));

const Schema = mongoose.Schema;

const appSchema = new Schema({
  date: Date,
  position: String,
  company: String,
  contact: {
    name: String,
    position: String,
    email: String,
    phone: String,
  },
  contactDate: Date,
  checklist: {
    researched: Boolean,
    reachedOut: Boolean,
    sentNote: Boolean,
    networked: Boolean,
  },
  status: String,
});

const userSchema = new Schema({
  username: String,
  photoUrl: String,
  googleId: { type: String, unique: true },
  sessionID: String,
  email: String,
  password: String,
  apps: [appSchema], // array of _.id props of users apps
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;
