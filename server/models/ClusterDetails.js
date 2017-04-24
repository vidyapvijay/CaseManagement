//reference of dbconnection.js
var mysql_pool = require('../DBConnection');

// REST API calls for tbl_clusterdetails
var ClusterDetails = {

		getClusterByName: function(clusterName, callback) {
			return mysql_pool.query("select * from clusterdetails where clustername = ?", [clusterName], callback);
		},

		getAll: function(callback){
			return mysql_pool.query("Select * from clusterdetails", callback);
		},
		
		updateCluster: function(clusterName, ClusterDetails, callback) {
	    	return  mysql_pool.query("update clusterdetails set clusteraddress = ?, port = ?, clustertype = ? where clustername = ?",
	    		[ClusterDetails.clusteraddress, ClusterDetails.port, ClusterDetails.clustertype, clusterName], callback);
		},

		addCluster: function(ClusterDetails, callback) {
			return mysql_pool.query("Insert into clusterdetails values(?, ?, ?, ?)", 
				[ClusterDetails.clustername, ClusterDetails.clusteraddress, ClusterDetails.port, ClusterDetails.clustertype], callback);
		},

		deleteCluster: function(clusterName, callback){
			return mysql_pool.query('DELETE FROM clusterdetails WHERE clustername = ?', [clusterName], callback);
		}
};

module.exports = ClusterDetails;