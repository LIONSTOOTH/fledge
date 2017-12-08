const express = require('express');
let app = express();
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let db = require('../db/index.js');

app.set('port', (process.env.PORT || 2000));
app.use(express.static(__dirname + '/../dist/'));
app.use(bodyParser.json());

app.listen(app.get('port'), function() {
	console.log('app is running on port', app.get('port'));
})

app.post('/api/application', function(req,res) {
	console.log('in server post');
	console.log('req.body in server post', req.body);
});

app.get('/api/application', function(req,res) {
	console.log('in server get');
	console.log('req.body in server get', req.body);
});

