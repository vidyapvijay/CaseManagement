import * as mysql from "mysql";
//MySQL Connection
const pool = mysql.createPool({
	connectionLimit : 100, //important
	host:'localhost',
 	user:'root',
 	password:'Admin123#',
 	database:'hpccinfo'
});
export = pool;

