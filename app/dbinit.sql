CREATE DATABASE erste;

USE DATABASE erste;

CREATE TABLE bankcards (
	card_id INT(7) NOT NULL AUTO_INCREMENT,
	card_type VARCHAR(40) NOT NULL,
	card_num INT(16) NOT NULL,
	card_valid VARCHAR(5) NOT NULL,
	card_hash VARCHAR(150) NOT NULL,
	card_blocked BOOLEAN NOT NULL,
	PRIMARY KEY (card_id)
);

CREATE TABLE contact (
	contact_id INT(7) NOT NULL AUTO_INCREMENT,
	card_id` INT(7) NOT NULL,
	contact_type VARCHAR(20) NOT NULL,
	contact_data VARCHAR(40) NOT NULL,
	PRIMARY KEY (contact_id)
);
