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
div.innerHTML= 'CardNumber: <input type="number" name="cardNumber"><br>';
})

addCard.addEventListener('click', (event)=>{
event.preventDefault();
h2.innerHTML = "Add Card"
let div = document.querySelector("div");
div.innerHTML=`Username: <input type="text" name="username"><br>
Password: <input type="password" name="password"><br>
Card Type: <input type="text" name="cardType"><br>
CardNumber: <input type="number" name="cardNumber"><br>
Valid through: <input type="text" name="validThru"><br>
CVV: <input type="password" name="CVV"><br>
Owner: <input type="text" name="owner"><br>
Contact info: <input type="text" name="contactInfo"><br>
Contact type: <input type="text" name="contactType"><br>`
})

blockCard.addEventListener('click', (event) =>{
  event.preventDefault();
  h2.innerHTML = "Block Card"
  let div = document.querySelector("div");
  div.innerHTML=`Username: <input type="text" name="username"><br>
  Password: <input type="password" name="password"><br>
  Card Number: <input type="text" name="cardNumber"><br>`
})

checkValidity.addEventListener('click', (event)=>{
  event.preventDefault();
  h2.innerHTML = "Check Validity"
  let div = document.querySelector("div");
  div.innerHTML=`Card Number: <input type="text" name="cardNumber"><br>`
})

button.addEventListener('click', (event) => Register())


const Register = function() {
  event.preventDefault();
  fetch('http://54.81.110.184:3000/ecards', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    mode: "same-origin",
    body: JSON.stringify({
      "cardType": document.querySelectorAll("input")[0].value,
      "cardNumber": document.querySelectorAll("input")[1].value,
      "validThru": document.querySelectorAll("input")[2].value,
      "CVV": document.querySelectorAll("input")[3].value,
      "owner": document.querySelectorAll("input")[4].value,
      "contactInfo": document.querySelectorAll("input")[5].value,
      "contactType": document.querySelectorAll("input")[6].value
    }),
  })
 }