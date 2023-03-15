-- Setup the mysql Docker Container for external use and create movie-db with example movies and test user.

ALTER USER 'root'@'localhost' IDENTIFIED BY 'sml12345';

UPDATE mysql.user SET host="%" WHERE user="root";
FLUSH PRIVILEGES;

CREATE DATABASE `movie-db`;
USE `movie-db`;

CREATE TABLE `Movies` (
      `id` int(11) NOT NULL AUTO_INCREMENT,
      `title` varchar(255) DEFAULT NULL,
      `year` int(11) DEFAULT NULL,
      PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
INSERT INTO `Movies` (`title`, `year`) VALUES ('Top Gun : Maverik', 2022),
('Avengers: Endgame', 2019),
('Avengers: Infinity War', 2018),
('Captain America: The First Avenger', 2011), ('Spider-Man: Far From Home', 2019);

CREATE TABLE `Users` (
  id INTEGER NOT NULL AUTO_INCREMENT,
  username VARCHAR(255) DEFAULT NULL,
  firstname VARCHAR(255) DEFAULT NULL,
  lastname VARCHAR(255) DEFAULT NULL,
  password VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (id)
);
INSERT INTO Users (username, firstname, lastname, password) VALUES
('test', 'Test', 'Test', '098f6bcd4621d373cade4e832627b4f6');
