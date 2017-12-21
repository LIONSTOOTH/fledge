const mongoose = require('mongoose');
require('dotenv').config();

// mongoose.connect('mongodb://localhost/fledge');
mongoose.connect('mongodb://localhost/fledge' ||
    `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@ds135486.mlab.com:35486/heroku_kgsk3z8c`,
  { useMongoClient: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'db connection error: '));
db.once('open', () => console.log('db connection success'));

const Schema = mongoose.Schema;

const appSchema = new Schema({
  date: Date,
  position: String,
  company: String,
  companyImg: String,
  contactDate: Date,
  checklist: {
    researched: Boolean,
    reachedOut: Boolean,
    sentNote: Boolean,
    networked: Boolean,
  },
  status: String,
});

const contactSchema = new Schema({
  name: String,
  position: String,
  email: String,
  phone: String,
  company: String,
  applicationId: String,
});

const reminderSchema = new Schema({
  summary: String,
  description: String,
  start: String,
  applicationId: String,
});

const userSchema = new Schema({
  username: String,
  photoUrl: String,
  googleId: { type: String, unique: true },
  sessionID: String,
  email: String,
  password: String,
  apps: [appSchema], // array of _.id props of users apps
  reminders: [reminderSchema],
  contacts: [contactSchema],
});

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);
const App = mongoose.model('App', appSchema);
const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports.User = User;
module.exports.Contact = Contact;
module.exports.App = App;
module.exports.Reminder = Reminder;