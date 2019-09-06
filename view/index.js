'use strict';

let button = document.querySelector("button")
let addCard = document.getElementById("addCard");
let queryCard = document.getElementById("queryCard");
let blockCard = document.getElementById("blockCard");
let checkValidity = document.getElementById("checkValidity");
let h2 = document.querySelector("h2")

queryCard.addEventListener('click', (event) =>{
event.preventDefault();
h2.innerHTML = "Query"
let div = document.querySelector("div");
div.innerHTML= 'CardNumber: <input type="number" name="cardNumber" class = "choice"><br>';
})

addCard.addEventListener('click', (event)=>{
event.preventDefault();
h2.innerHTML = "Add Card"
let div = document.querySelector("div");
div.innerHTML=`Username: <input type="text" name="username" class = "choice"><br>
Password: <input type="password" name="password" class = "choice"><br>
Card Type: <select name="cardType" class = "choice">
        <option value='Mastercard Standard'>Mastercard Standard</option>
        <option value='Maestro'>Maestro</option>
        <option value='Mastercard Gold'>Mastercard Gold</option>
        <option value='Mastercard World Gold'>Mastercard World Gold</option>
        <option value="Mastercard Standard Devisa">Mastercard Standard Devisa</option>
        <option value='Maestro Student'>Maestro Student</option>
        <option value='Visa Classic'>Visa Classic'</option>
        <option value='Visa Virtual'>Visa Virtual</option>
        <option value='Visa Electron'>Visa Electron</option>
      </select><br>
CardNumber: <input type="number" name="cardNumber" class = "choice"><br>
Valid through: <input type="text" name="validThru" class = "choice"><br>
CVV: <input type="password" name="CVV" class = "choice"><br>
Owner: <input type="text" name="owner" class = "choice"><br>
Contact info: <input type="text" name="contactInfo" class = "choice"><br>
Contact type: <input type="text" name="contactType" class = "choice"><br>`
})

blockCard.addEventListener('click', (event) =>{
  event.preventDefault();
  h2.innerHTML = "Block Card"
  let div = document.querySelector("div");
  div.innerHTML=`Username: <input type="text" name="username" class = "choice"><br>
  Password: <input type="password" name="password" class = "choice"><br>
  Card Number: <input type="text" name="cardNumber" class = "choice"><br>`
})

checkValidity.addEventListener('click', (event)=>{
  event.preventDefault();
  h2.innerHTML = "Check Validity"
  let div = document.querySelector("div");
  div.innerHTML=`Card Type: <select name="cardType" class = "choice">
  <option value='Mastercard Standard'>Mastercard Standard </option>
  <option value='Maestro'>Maestro</option>
  <option value='Mastercard Gold'>Mastercard Gold</option>
  <option value='Mastercard World Gold'>Mastercard World Gold</option>
  <option value="Mastercard Standard Devisa">Mastercard Standard Devisa</option>
  <option value='Maestro Student'>Maestro Student</option>
  <option value='Visa Classic'>Visa Classic'</option>
  <option value='Visa Virtual'>Visa Virtual</option>
  <option value='Visa Electron'>Visa Electron</option>
</select><br>
  Card Number: <input type="text" name="cardNumber" class = "choice"><br>
  Valid through: <input type="text" name="validThru" class = "choice"><br>
  CVV: <input type="password" name="CVV" class = "choice"><br>`
})

button.addEventListener('click', (event) => send())


const send = function() {
  if(h2.innerHTML==='Add Card'){
    event.preventDefault();
    fetch('http://3.87.38.201:3000/ecards', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "same-origin",
      body: JSON.stringify({
        "username":document.querySelectorAll(".choice")[0].value,
        "password":document.querySelectorAll(".choice")[1].value,
        "cardType": document.querySelectorAll(".choice")[2].value,
        "cardNumber": document.querySelectorAll(".choice")[3].value,
        "validThru": document.querySelectorAll(".choice")[4].value,
        "CVV": document.querySelectorAll(".choice")[5].value,
        "owner": document.querySelectorAll(".choice")[6].value,
        "contactInfo": document.querySelectorAll(".choice")[7].value,
        "contactType": document.querySelectorAll(".choice")[8].value
      }),
    })
			.then(response => response.json())
			.then(data => console.log(data))
  }else if(h2.innerHTML==="Query"){
    event.preventDefault();
    fetch(`http://3.87.38.201:3000/ecards/${document.querySelectorAll('input')[0].value}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "same-origin",
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }else if(h2.innerHTML==='Block Card'){
    event.preventDefault();
    fetch(`http://3.87.38.201:3000/ecards/${document.querySelectorAll(".choice")[2].value}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "same-origin",
      body: JSON.stringify({
        "username": document.querySelectorAll(".choice")[0].value,
        "password": document.querySelectorAll(".choice")[1].value,
      }),
    })
    .then(response => response.json())
    .then(data => console.log(data))
  }else if(h2.innerHTML='Check Validity'){
    event.preventDefault();
    fetch('http://3.87.38.201:3000/validate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      mode: "same-origin",
      body: JSON.stringify({
        "cardNumber": document.querySelectorAll(".choice")[1].value,
        "cardType": document.querySelectorAll(".choice")[0].value,
        "validThru": document.querySelectorAll(".choice")[2].value,
        "CVV": document.querySelectorAll(".choice")[3].value,
      }),
    })
    .then(data => console.log(data))
  }
 }