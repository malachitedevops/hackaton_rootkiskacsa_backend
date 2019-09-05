CREATE DATABASE erste;

USE erste;

CREATE TABLE bankcards (
	card_id INT NOT NULL AUTO_INCREMENT,
	card_type ENUM('Mastercard Standard', 'Maestro', 'Mastercard Gold', 'Mastercard World Gold', 'Mastercard Standard Devisa', 'Maestro Student', 'Visa Classic', 'Visa Virtual', 'Visa Electron' ) NOT NULL,
	card_num BIGINT NOT NULL UNIQUE,
	card_valid VARCHAR(5) NOT NULL,
	card_owner VARCHAR(40) NOT NULL,
	card_hash VARCHAR(150) NOT NULL,
	card_blocked BOOLEAN NOT NULL DEFAULT false,
	PRIMARY KEY (card_id)
);

CREATE TABLE contact (
	contact_id INT NOT NULL AUTO_INCREMENT,
	card_id INT NOT NULL,
	contact_type VARCHAR(20) NOT NULL,
	contact_data VARCHAR(40) NOT NULL,
	PRIMARY KEY (contact_id),
	CONSTRAINT fk_card_id 
	FOREIGN KEY (card_id)
	REFERENCES bankcards (card_id)
	ON DELETE CASCADE
);
