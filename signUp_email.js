"use strict";
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("INIT");

  document.querySelector("#signup-submit").addEventListener("click", checkForm);
}

function checkForm() {
  console.log("Check form");

  let form = document.querySelector("#signUp-block-form");
  let valid = form.checkValidity();
  console.log(valid);
  if (valid == true) {
    makeObject();
  }
}

function makeObject() {
  let params = new URL(window.location).searchParams;
  let urlCharger = params.get("chargers");
  let urlService = params.get("service");
  let urlTotal = params.get("total");
  let urlId = params.get("id");

  console.log("OBJECT CREATION");
  let input_firstName = document.querySelector("#firstName-input");
  let input_lastName = document.querySelector("#lastName-input");
  let input_email = document.querySelector("#email-input");
  let input_number = document.querySelector("#number-input");
  let input_password = document.querySelector("#password-input");
  const data = {
    service: urlService,
    id: urlId,
    charger: urlCharger,
    total: urlTotal,
    firstName: input_firstName.value,
    lastName: input_lastName.value,
    email: input_email.value,
    country: "-placeholder country-",
    zipCode: "-placeholder zipCode",
    phoneNumber: input_number.value,
    password: input_password.value,
    ccNumber: "-placeholder ccN-",
    ccYear: "-placeholder ccY-",
    ccMonth: "-placeholder ccM-",
    ccName: "-placeholder ccN-",
    ccCvv: "-placeholder ccCvv-"
  };
  console.log(data);
  post(data);
}

function post(data) {
  const postData = JSON.stringify(data);

  fetch("https://voltcustomers-f457.restdb.io/rest/customer-details", {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ca48775df5d634f46ecb225",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(res => window.location.assign("delivery.html?id=" + data.id));
}
