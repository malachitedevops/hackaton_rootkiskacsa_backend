'use strict'
const express = require('express');
const app = express();
const PORT = 3000;
const mysql = require('mysql');
const sha512 = require('js-sha512');
const cors = require('cors');
require('dotenv').config();
app.use(express.static('view'));
app.use(express.json());

const conn = mysql.createConnection({
  host: 'terraform-20190905185139149400000001.cc4trv09ziot.us-east-1.rds.amazonaws.com',
  user: 'rootkiskacsa',
  password: 'vim123okosember1',
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
	checkAuthority(req.body.username, req.body.password)
		.then(data => checkCardNumber(req.body.cardNumber))
		.then(count => newCard(req.body))
		.then(card_id => newContactInfo(card_id, req.body))
		.then(data => res.status(200).send())
		.catch(err => res.status(500).json(err));
});

app.get('/ecards/:cardNumber', (req, res) => {
	getDataByCardNumber(req.params.cardNumber)
		.then(data => res.status(200).json(data))
		.catch(err => res.status(404).json(err));
});

app.post('/ecards/validate', (req, res) => {
	getCardDetails(req.body.cardNumber)
		.then(data => validate(data, req.body))
		.then(data => res.status(200).json({'result': data}))
		.catch(err => res.status(500).json(err))
});

app.put('/ecards/:cardNumber', (req, res) => {
	checkAuthority(req.body.username, req.body.password)
		.then(data => blockCard(req.params.cardNumber))
		.then(data => res.status(200).send())
		.catch(err => res.status(404).send())
});


function checkCardNumber(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
		'SELECT COUNT(*) AS x FROM bankcards WHERE card_num = ? ',
		[ cardNumber ],
		(err, count) => {
		if (err)
			reject(err);
		else if (count[0].x == 1)
			reject('Card number is already in the database');
		else
			resolve();
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


function newCard(cardDetails){
	return new Promise((resolve, reject) => {
		let hash = sha512(`${cardDetails.cardNumber}${cardDetails.validThru}${cardDetails.CVV}`);

		conn.query(
			'INSERT INTO bankcards (card_type, card_num, card_validThru, card_owner, card_hash) VALUES ( ?, ?, ?, ?, ?);',
			[cardDetails.cardType, cardDetails.cardNumber, cardDetails.validThru, cardDetails.owner, hash ],
			(err, data) => {
				if (err)
					reject(err);
				else 
					resolve(data.insertId);
			});
	});
};

function newContactInfo(cardId, contactDetails){
	return new Promise((resolve, reject) => {
		for (let i = 0 ; i < contactDetails.contactType.length ; i++){
			conn.query(
				'INSERT INTO contact (card_id, contact_type, contact_data) VALUES ( ?, ?, ?);',
				[ cardId, contactDetails.contactType[i], contactDetails.contactInfo[i] ],
				(err) => {
					if (err)
						reject(err);
				}
			)}
		resolve();
	});
}

function getDataByCardNumber(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
			'SELECT card_id, card_type, card_num, card_validThru, card_blocked, card_owner FROM bankcards WHERE card_num = ? ;',
			[ cardNumber ],
			(err, cardDetails) => {
				if (err)
					reject(err);
				else
					conn.query(
						'SELECT contact_type, contact_data FROM contact WHERE card_id = ? ;',
						[ cardDetails[0].card_id ],
						(err, contactDetails) => {
							if (err)
								reject(err);
							else {
								let contactInfo = new Array();

								contactDetails.forEach(row => {
									let contactRecord = new Object();

									contactRecord["contact_type"] = row.contact_type;
									contactRecord["contact_data"] = row.contact_data;
									contactInfo.push(contactRecord);
								})

								resolve( new Object(
										{ 
										cardType : `${cardDetails[0].card_type}`,
										cardNumber : `${cardDetails[0].card_num}`,
										validThru : `${cardDetails[0].card_validThru}`,
										disabled : cardDetails[0].card_blocked == 0 ? 'no' : 'yes' ,
										owner : `${cardDetails[0].card_owner}`,
										contactinfo : contactInfo
										}
									)
								);
							}
						}
					);
				}
			);
		}
	);
}

function blockCard(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
			'UPDATE bankcards SET card_blocked = true WHERE card_num = ? ;',
			[ cardNumber ],
			(err) => {
				if (err)
					reject(err);
				else
					resolve();
			}
		)
	});
}

function validate(data, request){
	return new Promise((resolve, reject) => {
		if (!data.card_blocked){
			if (data.card_type == request.cardType){
				if (data.card_hash == sha512(`${request.cardNumber}${request.validThru}${request.CVV}`)){
					resolve('VALID')
				}
			}
		}
		resolve('INVALID')
	});
}

function getCardDetails(cardNumber){
	return new Promise((resolve, reject) => {
		conn.query(
			'SELECT card_blocked, card_type, card_hash FROM bankcards WHERE card_num = ?;',
			[ cardNumber ],
			(err, data) => {
				if (err)
					reject(err);
				else
					resolve(data[0]);
			}
		)
	});
}

function checkAuthority(username, password){
	return new Promise((resolve, reject) => {
		conn.query(
		'SELECT username, user_hash FROM tokens WHERE username = ? ;',
		[ username ],
		(err) => {
			if (err, data)
				reject(err);
			else if ( data[0].user_hash == sha512(`${username}${password}`){
				resolve()
			} else {
				reject('Cant access');
		});
	});
}
