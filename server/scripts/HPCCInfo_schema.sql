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