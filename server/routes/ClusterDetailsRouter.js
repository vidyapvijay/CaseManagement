//Dependencies
var express = require('express');
var router = express.Router();
const rp = require('request-promise');
const logger = require("../utils/logger");
var superagent = require("superagent");

//Routes
router.post('/checkConnection', function(req, res, next) {
	const password = req.body.password;
	const url = req.body.url;
	rp({
		uri: url,
		json: true,
		headers: {
			'User-Agent': 'Request-Promise',
			"Authorization": "Basic " + password
		}
	})
	.then((data) => {
		logger.info("REQUEST URL: "+ req.url +", REQUEST IP:  "+ req.ip +", RESPONSE STATUS CODE: " +res.statusCode);
		const statusCode = res.statusCode;
		return res.status(statusCode).json(data);
	})
	.catch((err) => {
		logger.info("REQUEST URL: "+ req.url +", REQUEST IP:  "+ req.ip +", RESPONSE STATUS CODE: " +res.statusCode);
		logger.error("ERROR MESSAGE: "+ err.message);
		return res.status(400).json(err.message);
	});
});

router.post('/getDropZoneList', function (request, response) {
    try {
		let url = request.body.eclIP;
		let username = request.body.username;
		let password = request.body.password;
        url = url + "/WsTopology/TpDropZoneQuery.json";
        superagent
			.get(url)
			.auth(username,password)
            .end((err, res1) => {
                if (err) { return console.log('Error: ', err); }
                console.log('Body: ', res1.body);
                response.json(res1.body);
            });
    } catch (err) {
        console.log('err', err);
    }
});

router.post('/getFolderList', function (request, response) {
    try {
	   	let url = request.body.eclIP;
		let username = request.body.username;
		let password = request.body.password;
		let path =  request.body.path;
		let netaddress = request.body.netaddress;
		console.log("netaddress",netaddress);
        url = url + "/FileSpray/FileList.json";
        superagent
            .get(url)
            .query({ Path: path, Netaddr:netaddress,DirectoryOnly:true })
            .auth(username,password)
            .end((err, res1) => {
                if (err) { return console.log('Error: ', err); }
                console.log('Body: ', res1.body);
                response.json(res1.body);
            });
    } catch (err) {
        console.log('err', err);
    }
});

//Return router
module.exports = router;