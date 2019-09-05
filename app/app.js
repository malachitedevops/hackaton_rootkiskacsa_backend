'use strict'
const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
const sha512 = require('js-sha512');
const cors = require('cors');
require('dotenv').config();
app.use(express.static('view'));
app.use(express.json());

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'erste'
});

app.listen(PORT, () => console.log('Server is listening on port: ' + PORT));

app.get('/', (req, res) => {
	res.status(200).sendFile('index.html');
});

app.get('/healthcheck', (req, res) => {
	res.status(200).json({"status":"ok"});
});

app.post('/ecards', (req, res) => {
//	checkCardDetails()
	checkCardNumber(req.body.cardNumber)
		.then(count => count == 0 ? newCardToDB(req.body) : res.status(500).send('Card number already in use'))
		.then(card_id => newContactInfo(card_id, req.body))
		.then(data => res.status(200).send())
		.catch(err => res.status(500).json(err));
});

app.get('/ecards/:cardNumber', (req, res) => {
	getDataByCardNumber(cardNumber)
		.then(data => res.status(200).json(data))
		.catch(err => res.status(500).json(err));
});

app.post('/ecards/validate', (req, res) => {
	//validate a card
	//req.body => cardType, cardNumber, validThru, CVV
	//check if its blocked
	//check if cardType is correct
	//check hash
	//send back VALID/INVALID
});

app.put('/ecards/:cardNumber', (req, res) => {
	//block a card
});

conn.query('select * from bankcards', (err,data)=> console.log(data));

function checkCardNumber(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
		'SELECT COUNT(*) FROM bankcards WHERE card_num=?',
		[cardNumber],
		(err, count) => {
		if (err)
			reject(err);
		else
			resolve(count[0]);
		});
	});
};

function checkCardDetails(cardDetails){
	return new Promise((resolve, reject) => {
		if ( cardDetails.cardNumber.length == 16 ){
			if ( validThru == /\d{2}\/\d{2}/g ){
				if ( validThru.split('/')[0] < 13 && validThru.split('/')[1] < 32 ){
					if ( CVV.length == 3 ){
						resolve();
					}
				}
			}
		}
		reject();
	});
}


function newCardToDB(cardDetails){
	return new Promise((resolve, reject) => {
		let hash = sha512(`${cardDetails.cardNumber}${cardDetails.validThru}${cardDetails.CVV}`);

		conn.query(
			'INSERT INTO bankcards (card_type, card_num, card_valid, card_owner, card_hash) VALUES ( ?, ?, ?, ?, ?);',
			[cardDetails.cardType, cardDetails.cardNumber, cardDetails.validThru, cardDetails.owner, hash ],
			(err, data) => {
				if (err){
					reject(err);
				}
				else {
					resolve(data.insertId);
				}
			});
	});
};

function newContactInfo(card_id, contactDetails){
	return new Promise((resolve, reject) => {
		conn.query(
			'INSERT INTO contact (card_id, contact_type, contact_data) VALUES ( ?, ?, ?);',
			[card_id, contactDetails.contactType, contactDetails.contactInfo],
			(err) => {
				if (err)
					reject(err);
				else
					resolve();
			});
	});
}
