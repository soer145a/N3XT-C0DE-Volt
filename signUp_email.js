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
  let id = params.get("id");

  console.log("OBJECT CREATION");
  let input_firstName = document.querySelector("#firstName-input");
  let input_lastName = document.querySelector("#lastName-input");
  let input_email = document.querySelector("#email-input");
  let input_number = document.querySelector("#number-input");
  let input_password = document.querySelector("#password-input");
  let data = {
    service: urlService,
    charger: urlCharger,
    total: urlTotal,
    firstName: input_firstName.value,
    lastName: input_lastName.value,
    email: input_email.value,
    phoneNumber: input_number.value,
    password: input_password.value
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
      "h-apikey": "b9a6eb9dec1772512d2c6f9deeafcf2fbd7e2",
      "cache-control": "no-cache"
    },
    body: postData
  })
    .then(res => res.json())
    .then(data => console.log(data));
}
