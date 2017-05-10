var mysql = require('mysql');

//MySQL Connection
var pool = mysql.createPool({
	connectionLimit : 100, //important
	host:'localhost',
 	user:'root',
 	password:'password',
 	database:'hpccinfo'
});

module.exports = pool;