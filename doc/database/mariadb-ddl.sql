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


-- lolp.champion_tags definition

CREATE TABLE `champion_tags` (
  `tag` varchar(24) NOT NULL,
  PRIMARY KEY (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- lolp.summoner definition

CREATE TABLE `summoner` (
  `id` varchar(64) NOT NULL COMMENT 'Encrypted summoner ID',
  `accountId` varchar(60) NOT NULL COMMENT 'Encrypted account ID',
  `profileIconId` int(11) DEFAULT NULL COMMENT 'ID of the summoner icon associated with the summoner.',
  `revisionDate` bigint(20) NOT NULL,
  `name` varchar(256) NOT NULL COMMENT 'Summoner name.',
  `puuid` varchar(79) DEFAULT NULL COMMENT 'Encrypted PUUID',
  `summonerLevel` bigint(20) DEFAULT NULL COMMENT '	Summoner level associated with the summoner.',
  `region` varchar(8) NOT NULL DEFAULT 'KR' COMMENT 'summoner region',
  PRIMARY KEY (`id`),
  UNIQUE KEY `summoner_name_UN` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='소환사';


-- lolp.champion definition

CREATE TABLE `champion` (
  `id` varchar(60) NOT NULL COMMENT '챔피언 ID',
  `version` varchar(32) NOT NULL COMMENT '버전',
  `champion_key` varchar(24) NOT NULL COMMENT '챔피언 키',
  `name` varchar(60) NOT NULL COMMENT '챔피언 이름',
  `title` varchar(256) NOT NULL,
  `blurb` varchar(1024) NOT NULL,
  `partype` varchar(60) NOT NULL,
  `stats_seq` int(11) NOT NULL,
  `info_seq` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_champion_stats_TO_champion` (`stats_seq`),
  KEY `FK_champion_info_TO_champion` (`info_seq`),
  CONSTRAINT `FK_champion_info_TO_champion` FOREIGN KEY (`info_seq`) REFERENCES `champion_info` (`seq`),
  CONSTRAINT `FK_champion_stats_TO_champion` FOREIGN KEY (`stats_seq`) REFERENCES `champion_stats` (`seq`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='챔피언';


-- lolp.champion_to_tags definition

CREATE TABLE `champion_to_tags` (
  `seq` int(11) NOT NULL AUTO_INCREMENT,
  `champion_id` varchar(60) NOT NULL COMMENT '챔피언 ID',
  `champion_tag` varchar(24) NOT NULL,
  PRIMARY KEY (`seq`),
  KEY `FK_champion_tags_TO_champion_to_tags` (`champion_tag`),
  KEY `FK_champion_TO_champion_to_tags` (`champion_id`),
  CONSTRAINT `FK_champion_TO_champion_to_tags` FOREIGN KEY (`champion_id`) REFERENCES `champion` (`id`),
  CONSTRAINT `FK_champion_tags_TO_champion_to_tags` FOREIGN KEY (`champion_tag`) REFERENCES `champion_tags` (`tag`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- lolp.league definition

CREATE TABLE `league` (
  `leagueId` varchar(62) NOT NULL,
  `queueType` varchar(48) NOT NULL,
  `tier` varchar(24) NOT NULL,
  `rank` varchar(12) NOT NULL,
  `leaguePoints` int(11) NOT NULL,
  `wins` int(11) NOT NULL,
  `losses` int(11) NOT NULL,
  `veteran` tinyint(1) NOT NULL DEFAULT 0,
  `inactive` tinyint(1) NOT NULL DEFAULT 0,
  `freshBlood` tinyint(1) NOT NULL DEFAULT 0,
  `hotStreak` tinyint(1) NOT NULL DEFAULT 0,
  `summonerId` varchar(64) NOT NULL,
  `winRate` double NOT NULL DEFAULT 0,
  PRIMARY KEY (`leagueId`),
  KEY `league_FK` (`summonerId`),
  CONSTRAINT `league_FK` FOREIGN KEY (`summonerId`) REFERENCES `summoner` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='리그정보 테이블';