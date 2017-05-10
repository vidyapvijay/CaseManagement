CREATE DATABASE  IF NOT EXISTS `hpccinfo`;
USE `hpccinfo`;

--
-- Table structure for table `clusterdetails`
--

CREATE TABLE `clusterdetails` (
  `clustername` varchar(50) NOT NULL,
  `clusteraddress` varchar(50) NOT NULL,
  `port` int(11) NOT NULL,
  `clustertype` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `clusterdetails`
--

INSERT INTO `clusterdetails` VALUES ('Four-Way','10.173.147.1',8010,'default');


--
-- Table structure for table `ProjectDetails`
--

CREATE TABLE `projectdetails` (
  `projectdata` TEXT NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `updatedby` varchar(50) NOT NULL
  `dateupdate` timestamp,
  `file` varchar(100)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `projectdetails`
--

INSERT INTO `projectdetails` VALUES ('raja.sundarrajan@lexisnexis.com','{ "cluster_details":{ "ip":"10.173.147.1", "name":"4-way", "port":"8010", "username":"rsundarrajan", "password":"Lexis123", "httpsecured" : "true" }, "Tabs":[ { "title":"auditloginput", "inputdsname":"", "outputdsname":"inputds123", "inputeclcode":"", "outputeclcode":"inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); ", "inputTab":"", "pluginId":"common-input", "expression":"~arjunademo::univ", "wuid":"WU20170425-123450", "displayFields":"city,state,zip" }, { "title":"filterAuditLog", "inputdsname":"inputds123", "outputdsname":"filterds123", "inputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); ", "outputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); \nfilterds123 := inputds123(city=''Miami'');", "inputTab":"auditloginput", "expression":"city=''Miami''", "pluginId":"common-filter", "wuid":"WU20170425-123451", "displayFields":"city,state,zip" }, { "title":"sortAuditLog", "inputdsname":"filterds123", "outputdsname":"sortds123", "inputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); \nfilterds123 := inputds123(city=''Miami'');", "outputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); \nfilterds123 := inputds123(city=''Miami'');\n sortds123 := sort(filterds123, -state);", "inputTab":"filterAuditLog", "expression":"-start", "pluginId":"common-sort", "wuid":"WU20170425-123452", "displayFields":"city,state,zip" }, { "title":"aggregateAuditLog", "inputdsname":"sortds123", "outputdsname":"aggregateds123", "inputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); \nfilterds123 := inputds123(city=''Miami'');\n sortds123 := sort(filterds123, -state);", "outputeclcode":"rec := RECORD string name; string address1; string city; string state; string zip; string phone; string website; string field8; string city_sate_zip; END;inputds123 := DATASET(''~arjunademo::univ'', rec, THOR); \nfilterds123 := inputds123(city=''Miami'');\n sortds123 := sort(filterds123, -state);aggregateds123 := TABLE(sortds123, { sortds123.city, sortds123.state, zip_MAX:=MAX(zip)}, city,state , few);", "inputTab":"sortAuditLog", "expression":"hour_MAX:=MAX(zip)#city,state", "pluginId":"common-aggregate", "wuid":"WU20170425-123452", "displayFields":"city,state,zip" } ]}', 'alfresco_report');