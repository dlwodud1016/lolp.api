CREATE DATABASE `lolp` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

-- lolp.champion_info definition

CREATE TABLE `champion_info` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `attack` int(11) NOT NULL DEFAULT 0,
  `defense` int(11) NOT NULL DEFAULT 0,
  `magic` int(11) NOT NULL DEFAULT 0,
  `difficulty` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- lolp.champion_stats definition

CREATE TABLE `champion_stats` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `hp` double NOT NULL DEFAULT 0,
  `hpperlevel` double NOT NULL DEFAULT 0,
  `mp` double NOT NULL DEFAULT 0,
  `mpperlevel` double NOT NULL DEFAULT 0,
  `movespeed` double NOT NULL DEFAULT 0,
  `armor` double NOT NULL DEFAULT 0,
  `armorperlevel` double NOT NULL DEFAULT 0,
  `spellblock` double NOT NULL DEFAULT 0,
  `spellblockperlevel` double NOT NULL DEFAULT 0,
  `attackrange` double NOT NULL DEFAULT 0,
  `hpregen` double NOT NULL DEFAULT 0,
  `hpregenperlevel` double NOT NULL DEFAULT 0,
  `mpregen` double NOT NULL DEFAULT 0,
  `mpregenperlevel` double NOT NULL DEFAULT 0,
  `crit` double NOT NULL DEFAULT 0,
  `critperlevel` double NOT NULL DEFAULT 0,
  `attackdamage` double NOT NULL DEFAULT 0,
  `attackdamageperlevel` double NOT NULL DEFAULT 0,
  `attackspeedperlevel` double NOT NULL DEFAULT 0,
  `attackspeed` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;



-- lolp.champion definition

CREATE TABLE `champion` (
  `id` varchar(60) NOT NULL COMMENT '챔피언 ID',
  `version` varchar(32) NOT NULL COMMENT '버전',
  `champion_key` varchar(24) NOT NULL COMMENT '챔피언 키',
  `name` varchar(60) NOT NULL COMMENT '챔피언 이름',
  `title` varchar(256) NOT NULL,
  `blurb` varchar(1024) NOT NULL,
  `partype` varchar(60) NOT NULL,
  `tags` varchar(128) NOT NULL,
  `stats_seq` int(11) NOT NULL,
  `info_seq` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_champion_stats_TO_champion` (`stats_seq`),
  KEY `FK_champion_info_TO_champion` (`info_seq`),
  CONSTRAINT `FK_champion_info_TO_champion` FOREIGN KEY (`info_seq`) REFERENCES `champion_info` (`seq`),
  CONSTRAINT `FK_champion_stats_TO_champion` FOREIGN KEY (`stats_seq`) REFERENCES `champion_stats` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챔피언';