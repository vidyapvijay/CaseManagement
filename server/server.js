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
app.use('/clusterDetails', clusterDetailsRouter);


// Set static path
app.use(express.static(path.join(__dirname, '../client')));

//Start Server
app.listen(3000, function() {
	console.log('server started at port 3000');
});