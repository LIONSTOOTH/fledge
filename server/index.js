const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let db = require('../db/index.js');

app.set('port', (process.env.PORT || 2000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../dist/'));
app.use(bodyParser.json());

app.post('/api/applications', function(req,res) {
  console.log('in server post');
  console.log('req.body in server post', req.body);
});

app.get('/api/applications', function(req, res) {
  db.getApplications(function(apps) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ apps: apps }));
  });
});


app.listen(app.get('port'), function() {
	console.log('app is running on port', app.get('port'));
})
