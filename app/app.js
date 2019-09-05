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
	newCardToDB(req.body)
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



function getDataByCardNumber(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
		'SELECT COUNT(*)',
		(err, data) => {
		if (err)
			reject(err);
		else if (data.length == 1)
			resolve();
		});
	});
};

function newCardToDB(cardDetails){
	return new Promise((resolve, reject) => {
		let hash = sha512(`${cardDetails.cardNumber}${cardDetails.validThru}${cardDetails.CVV}`);
		console.log(hash);
		console.log(cardDetails);
		conn.query(
			`INSERT INTO TABLE bankcards 
			(card_type, card_num, card_valid, card_owner, card_hash) 
			VALUES (?,?,?,?);`,
			[cardDetails.cardType, cardDetails.cardNumber, cardDeatails.validThru, cardDetails.owner, hash ],
			(err, data) => {
			if (err)
				reject(err);
			else
				console.log(data);
				resolve();
			});
	});
};
