'use strict';

const button = document.querySelector("button");
button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log('ok');
  fetch(`http://localhost:3000/ecards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      cardType: document.querySelectorAll("input")[0].value,
      cardNumber: document.querySelectorAll("input")[1].value,
      validThru: document.querySelectorAll("input")[2].value,
      CVV: document.querySelectorAll("input")[3].value,
      owner: document.querySelectorAll("input")[4].value,
      contactInfo: document.querySelectorAll("input")[5].value,
      contactType: document.querySelectorAll("input")[6].value,
    }),
  })
})
