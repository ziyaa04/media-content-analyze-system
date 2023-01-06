# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення та початкового наповнення бази даних

```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Media-content-analyze-system
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `Media-content-analyze-system` ;

-- -----------------------------------------------------
-- Schema Media-content-analyze-system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Media-content-analyze-system` DEFAULT CHARACTER SET utf8 ;
USE `Media-content-analyze-system` ;

-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`user` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` TEXT NOT NULL,
  `login` TEXT NOT NULL,
  `password` TEXT NOT NULL,
  `email` TEXT NOT NULL,
  `role` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`help`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`help` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`help` (
  `id` INT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`filter`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`filter` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`filter` (
  `id` INT NOT NULL,
  `date_from` DATETIME NOT NULL,
  `date_to` DATETIME NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`request`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`request` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`request` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `date` DATETIME NOT NULL,
  `filter_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_request_filter1_idx` (`filter_id` ASC) VISIBLE,
  CONSTRAINT `fk_request_filter1`
    FOREIGN KEY (`filter_id`)
    REFERENCES `Media-content-analyze-system`.`filter` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`access`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`access` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`access` (
  `id` INT NOT NULL,
  `role` TEXT NOT NULL,
  `user_id` INT NOT NULL,
  `help_id` INT NOT NULL,
  `request_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_access_User_idx` (`user_id` ASC) VISIBLE,
  INDEX `fk_Access_Help1_idx` (`help_id` ASC) VISIBLE,
  INDEX `fk_access_request1_idx` (`request_id` ASC) VISIBLE,
  CONSTRAINT `fk_access_User`
    FOREIGN KEY (`user_id`)
    REFERENCES `Media-content-analyze-system`.`user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Access_Help1`
    FOREIGN KEY (`help_id`)
    REFERENCES `Media-content-analyze-system`.`help` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_access_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `Media-content-analyze-system`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`result`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`result` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`result` (
  `id` INT NOT NULL,
  `title` TEXT NOT NULL,
  `description` TEXT NOT NULL,
  `request_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_result_request1_idx` (`request_id` ASC) VISIBLE,
  CONSTRAINT `fk_result_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `Media-content-analyze-system`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Media-content-analyze-system`.`source`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `Media-content-analyze-system`.`source` ;

CREATE TABLE IF NOT EXISTS `Media-content-analyze-system`.`source` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `url` TEXT NOT NULL,
  `request_id` INT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_source_request1_idx` (`request_id` ASC) VISIBLE,
  CONSTRAINT `fk_source_request1`
    FOREIGN KEY (`request_id`)
    REFERENCES `Media-content-analyze-system`.`request` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `Media-content-analyze-system`.`user`
-- -----------------------------------------------------
START TRANSACTION;
USE `Media-content-analyze-system`;
INSERT INTO `Media-content-analyze-system`.`user` (`id`, `name`, `login`, `password`, `email`, `role`) VALUES (DEFAULT, 'John', 'JohnRoth', 'passw123', 'j@email.com', 'public');
INSERT INTO `Media-content-analyze-system`.`user` (`id`, `name`, `login`, `password`, `email`, `role`) VALUES (DEFAULT, 'Kate', 'KateDotson', 'passw124', 'k@email.com', 'public');

COMMIT;


-- -----------------------------------------------------
-- Data for table `Media-content-analyze-system`.`request`
-- -----------------------------------------------------
START TRANSACTION;
USE `Media-content-analyze-system`;
INSERT INTO `Media-content-analyze-system`.`request` (`id`, `title`, `description`, `date`, `filter_id`) VALUES (DEFAULT, 'Text search query ', 'breaking news around the world', '2022-12-02', NULL);
INSERT INTO `Media-content-analyze-system`.`request` (`id`, `title`, `description`, `date`, `filter_id`) VALUES (DEFAULT, 'Photo search query', 'find similar images', '2022-11-20', NULL);

COMMIT;


-- -----------------------------------------------------
-- Data for table `Media-content-analyze-system`.`source`
-- -----------------------------------------------------
START TRANSACTION;
USE `Media-content-analyze-system`;
INSERT INTO `Media-content-analyze-system`.`source` (`id`, `url`, `request_id`) VALUES (DEFAULT, 'https://www.nytimes.com/', NULL);
INSERT INTO `Media-content-analyze-system`.`source` (`id`, `url`, `request_id`) VALUES (DEFAULT, 'https://images.google.com/', NULL);

COMMIT;
```

## RESTfull сервіс для управління даними


