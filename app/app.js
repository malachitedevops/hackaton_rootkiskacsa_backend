'use strict'
const express = require('express');
const app = express();
const PORT = process.env.APP_PORT;
const mysql = require('mysql');
require('dotenv').config();
app.use(express.static('public'));
app.use(express.json());

const conn = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

app.get('/healthcheck', (req, res) => {
	res.status(200).json({"status":"ok"});
});

app.post('/ecards', (req, res) => {
	getCard()
		then(addCard)
});


