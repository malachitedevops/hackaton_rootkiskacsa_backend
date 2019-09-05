'use strict'
const express = require('express');
const app = express();
const PORT = 8080;
const mysql = require('mysql');
require('dotenv').config();
app.use(express.static('view'));
app.use(express.json());

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.listen(PORT, () => console.log('Server is listening on port: ' + PORT));

app.get('/', (req, res) => {
	res.status(200).sendFile('index.html');
});

app.get('/healthcheck', (req, res) => {
	res.status(200).json({"status":"ok"});
});

app.post('/ecards', (req, res) => {
	console.log(req.body); 
	//check if card exists
	//yes => status 500
	//no => addCard , status 200
	res.status(200).send();
});

app.get('/ecards/:cardNumber', (req, res) => {
	getDataByCardNumber()
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



function getDataByCardNumber(){};
