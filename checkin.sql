/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50720
 Source Host           : localhost:3306
 Source Schema         : checkin

 Target Server Type    : MySQL
 Target Server Version : 50720
 File Encoding         : 65001

 Date: 31/03/2018 19:27:31
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for t_activity
-- ----------------------------
DROP TABLE IF EXISTS `t_activity`;
CREATE TABLE `t_activity`  (
  `F_ID` int(11) NOT NULL AUTO_INCREMENT,
  `F_CreaterId` int(11) NOT NULL,
  `F_Caption` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `F_Desc` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `F_Location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `F_Lat` float NULL DEFAULT NULL,
  `F_Lng` float NULL DEFAULT NULL,
  `F_StartDate` date NULL DEFAULT NULL,
  `F_EndDate` date NULL DEFAULT NULL,
  `F_IfFace` int(11) NULL DEFAULT NULL,
  `F_IfLocation` int(11) NULL DEFAULT NULL,
  `F_IfPhoto` int(11) NULL DEFAULT NULL,
  PRIMARY KEY (`F_ID`) USING BTREE,
  INDEX `F_CreaterId`(`F_CreaterId`) USING BTREE,
  CONSTRAINT `t_activity_ibfk_1` FOREIGN KEY (`F_CreaterId`) REFERENCES `t_user` (`F_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_apply
-- ----------------------------
DROP TABLE IF EXISTS `t_apply`;
CREATE TABLE `t_apply`  (
  `F_ID` int(11) NOT NULL AUTO_INCREMENT,
  `F_ApplyerId` int(11) NOT NULL,
  `F_ActivityId` int(11) NOT NULL,
  `F_ApplyDate` date NULL DEFAULT NULL,
  PRIMARY KEY (`F_ID`) USING BTREE,
  INDEX `F_ApplyerId`(`F_ApplyerId`) USING BTREE,
  INDEX `F_ActivityId`(`F_ActivityId`) USING BTREE,
  CONSTRAINT `t_apply_ibfk_1` FOREIGN KEY (`F_ApplyerId`) REFERENCES `t_user` (`F_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_apply_ibfk_2` FOREIGN KEY (`F_ActivityId`) REFERENCES `t_activity` (`F_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_check
-- ----------------------------
DROP TABLE IF EXISTS `t_check`;
CREATE TABLE `t_check`  (
  `F_ID` int(11) NOT NULL AUTO_INCREMENT,
  `F_ActivityId` int(11) NULL DEFAULT NULL,
  `F_UserID` int(11) NULL DEFAULT NULL,
  `F_CheckDate` date NULL DEFAULT NULL,
  `F_PhotoUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`F_ID`) USING BTREE,
  INDEX `F_ActivityId`(`F_ActivityId`) USING BTREE,
  INDEX `F_UserID`(`F_UserID`) USING BTREE,
  CONSTRAINT `t_check_ibfk_1` FOREIGN KEY (`F_ActivityId`) REFERENCES `t_activity` (`F_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `t_check_ibfk_2` FOREIGN KEY (`F_UserID`) REFERENCES `t_user` (`F_ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 30 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user`  (
  `F_ID` int(11) NOT NULL AUTO_INCREMENT,
  `F_Name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `F_PhotoUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`F_ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- View structure for v_activity_info
-- ----------------------------
DROP VIEW IF EXISTS `v_activity_info`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `v_activity_info` AS select `t_activity`.`F_ID` AS `F_ActivityId`,`t_user`.`F_Name` AS `F_CreaterName`,`t_activity`.`F_Caption` AS `F_Caption`,`t_activity`.`F_Desc` AS `F_Desc`,`t_activity`.`F_Location` AS `F_Location`,`t_activity`.`F_Lat` AS `F_Lat`,`t_activity`.`F_Lng` AS `F_Lng`,`t_activity`.`F_StartDate` AS `F_StartDate`,`t_activity`.`F_EndDate` AS `F_EndDate`,`t_activity`.`F_IfFace` AS `F_IfFace`,`t_activity`.`F_IfLocation` AS `F_IfLocation`,`t_activity`.`F_IfPhoto` AS `F_IfPhoto` from (`t_activity` join `t_user` on((`t_activity`.`F_CreaterId` = `t_user`.`F_ID`)));

-- ----------------------------
-- View structure for v_apply_activity
-- ----------------------------
DROP VIEW IF EXISTS `v_apply_activity`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `v_apply_activity` AS select `t_activity`.`F_ID` AS `F_ID`,`t_activity`.`F_CreaterId` AS `F_CreaterId`,`t_activity`.`F_Caption` AS `F_Caption`,`t_activity`.`F_Desc` AS `F_Desc`,`t_activity`.`F_Lat` AS `F_Lat`,`t_activity`.`F_Lng` AS `F_Lng`,`t_activity`.`F_StartDate` AS `F_StartDate`,`t_activity`.`F_EndDate` AS `F_EndDate`,`t_activity`.`F_IfFace` AS `F_IfFace`,`t_activity`.`F_IfLocation` AS `F_IfLocation`,`t_activity`.`F_IfPhoto` AS `F_IfPhoto`,`t_apply`.`F_ApplyDate` AS `F_ApplyDate`,`t_apply`.`F_ApplyerId` AS `F_ApplyerId`,`t_activity`.`F_Location` AS `F_Location` from (`t_apply` join `t_activity` on((`t_apply`.`F_ActivityId` = `t_activity`.`F_ID`)));

-- ----------------------------
-- View structure for v_apply_info
-- ----------------------------
DROP VIEW IF EXISTS `v_apply_info`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `v_apply_info` AS select `t_activity`.`F_ID` AS `F_ID`,count(0) AS `F_ApplyNum`,`t_activity`.`F_Caption` AS `F_Caption`,`t_apply`.`F_ApplyerId` AS `F_ApplyerId` from (`t_activity` join `t_apply` on((`t_apply`.`F_ActivityId` = `t_activity`.`F_ID`))) group by `t_activity`.`F_ID`;

-- ----------------------------
-- View structure for v_check_detail
-- ----------------------------
DROP VIEW IF EXISTS `v_check_detail`;
CREATE ALGORITHM = UNDEFINED DEFINER = `root`@`localhost` SQL SECURITY DEFINER VIEW `v_check_detail` AS select `t_check`.`F_ActivityId` AS `F_ActivityId`,`t_check`.`F_UserID` AS `F_UserId`,`t_check`.`F_PhotoUrl` AS `F_CheckPhotoUrl`,`t_user`.`F_Name` AS `F_UserName`,`t_check`.`F_CheckDate` AS `F_CheckDate` from (`t_user` join `t_check` on((`t_check`.`F_UserID` = `t_user`.`F_ID`)));

SET FOREIGN_KEY_CHECKS = 1;
