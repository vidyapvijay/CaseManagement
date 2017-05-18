// Dependencies
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

// Body Parser MiddleWare
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

var clusterDetailsRouter = require('./routes/ClusterDetailsRouter');

var projectDetailsRouter = require('./routes/ProjectDetailsRouter');

app.use('/clusterDetails', clusterDetailsRouter);

app.use('/projectDetails', projectDetailsRouter);


// Set static path
app.use(express.static(path.join(__dirname, '../client')));

//Start Server
app.listen(3000, function() {
	console.log('server started at port 3000');
});