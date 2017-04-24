//Dependencies
var express = require('express');
var router = express.Router();
var ClusterDetails = require('../models/ClusterDetails');

//Routes
router.get('/:name?',function(req, res, next) {
	if(req.params.name){
	    ClusterDetails.getClusterByName(req.params.name, function(err, rows) {
	        if(err) {
	        	res.json(err);
	        } else {
	        	console.log("Rows: ", rows);
	            res.json(rows);
	        }
	    });
	} else {
		ClusterDetails.getAll(function(err, rows) {
		    if(err) {
		    	res.json(err);
		    } else {
		        res.json(rows);
		    }
	    });
	}
});

router.put('/:name',function(req, res, next) {
    ClusterDetails.updateCluster(req.params.name, req.body, function(err, rows) {
        if(err) {
            res.json(err);
        } else {
            res.json(rows);
        }
    });
});

router.post('/', function(req, res, next){
	ClusterDetails.addCluster(req.body, function(err, count) {
    	if(err) {
            res.json(err);
        } else {
            res.json(req.body); //TODO: Return count for 1 & 0
        }
    });
});

router.delete('/:name',function(req, res, next){
	ClusterDetails.deleteCluster(req.params.name, function(err, count) {
	    if(err) {
	        res.json(err);
	    } else {
	        res.json(count);
	    }
    });
});

//Return router
module.exports = router;