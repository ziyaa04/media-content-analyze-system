# Реалізація інформаційного та програмного забезпечення

## SQL-скрипт для створення та початкового наповнення бази даних

```
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Media-content-analyze-system
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Media-content-analyze-system
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS Media-content-analyze-system DEFAULT CHARACTER SET utf8 ;
USE Media-content-analyze-system ;

-- -----------------------------------------------------
-- Table Media-content-analyze-system.user
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.user (
  id INT NOT NULL,
  name TEXT NOT NULL,
  login TEXT NOT NULL,
  password TEXT NOT NULL,
  email TEXT NOT NULL,
  role TEXT NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.help
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.help (
  id INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.filter
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.filter (
  id INT NOT NULL,
  date_from DATETIME NOT NULL,
  date_to DATETIME NOT NULL,
  PRIMARY KEY (id))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.request
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.request (
  id INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date DATETIME NOT NULL,
  filter_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_request_filter1_idx (filter_id ASC) VISIBLE,
  CONSTRAINT fk_request_filter1
    FOREIGN KEY (filter_id)
    REFERENCES Media-content-analyze-system.filter (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.access
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.access (
  id INT NOT NULL,
  role TEXT NOT NULL,
  user_id INT NOT NULL,
  help_id INT NOT NULL,
  request_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_access_User_idx (user_id ASC) VISIBLE,
  INDEX fk_Access_Help1_idx (help_id ASC) VISIBLE,
  INDEX fk_access_request1_idx (request_id ASC) VISIBLE,
  CONSTRAINT fk_access_User
    FOREIGN KEY (user_id)
    REFERENCES Media-content-analyze-system.user (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_Access_Help1
    FOREIGN KEY (help_id)
    REFERENCES Media-content-analyze-system.help (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT fk_access_request1
    FOREIGN KEY (request_id)
    REFERENCES Media-content-analyze-system.request (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.result
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.result (
  id INT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  request_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_result_request1_idx (request_id ASC) VISIBLE,
  CONSTRAINT fk_result_request1
    FOREIGN KEY (request_id)
    REFERENCES Media-content-analyze-system.request (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table Media-content-analyze-system.source
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS Media-content-analyze-system.source (
  id INT NOT NULL,
  url TEXT NOT NULL,
  request_id INT NOT NULL,
  PRIMARY KEY (id),
  INDEX fk_source_request1_idx (request_id ASC) VISIBLE,
  CONSTRAINT fk_source_request1
    FOREIGN KEY (request_id)
    REFERENCES Media-content-analyze-system.request (id)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;
 

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
```

## RESTfull сервіс для управління даними


