CREATE DATABASE  IF NOT EXISTS `hpccinfo`;
USE `hpccinfo`;

--
-- Table structure for table `ProjectDetails`
--

CREATE TABLE `projectdetails` (
  `projectdata` TEXT NOT NULL,
  `projectid` varchar(50) NOT NULL,
  `title` varchar(50) NOT NULL,
  `updatedby` varchar(50) NOT NULL,
  `dateupdated` timestamp,
  `file` varchar(100)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;