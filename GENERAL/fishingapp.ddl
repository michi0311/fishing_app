CREATE TABLE `user` (id int(11) NOT NULL AUTO_INCREMENT, username varchar(45), email varchar(50) NOT NULL UNIQUE, password varchar(60) NOT NULL, PRIMARY KEY (id));
CREATE TABLE catch (id int(11) NOT NULL AUTO_INCREMENT, `date` date NOT NULL, time time NOT NULL, boilie varchar(255) NOT NULL, rig varchar(255) NOT NULL, temperature smallint(5) NOT NULL, weather varchar(255) NOT NULL, moon varchar(255) NOT NULL, watertemperature smallint(5) NOT NULL, userID int(11) NOT NULL, feedingGroundID int(11) NOT NULL, PRIMARY KEY (id));
CREATE TABLE feedingGround (id int(11) NOT NULL AUTO_INCREMENT, longitude decimal(13, 9), lattitude decimal(13, 9), notes varchar(255), PRIMARY KEY (id));
ALTER TABLE catch ADD CONSTRAINT FKcatch996058 FOREIGN KEY (userID) REFERENCES `user` (id);
ALTER TABLE catch ADD CONSTRAINT FKcatch809558 FOREIGN KEY (feedingGroundID) REFERENCES feedingGround (id);
