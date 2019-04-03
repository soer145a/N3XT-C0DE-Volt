"use strict";
window.addEventListener("DOMContentLoaded", init);

let cc = document.querySelector("#cc");
let paypal = document.querySelector("#paypal");
let mobilepay = document.querySelector("#mobilepay");

let ccText = document.querySelector("#cc-form");
let ppText = document.querySelector("#paypal-text");
let mpText = document.querySelector("#mobilepay-text");

function init() {
  cc.addEventListener("click", () => {
    cc.classList.add("active");
    mobilepay.classList.remove("active");
    paypal.classList.remove("active");
    //
    ccText.classList.add("opened");
    mpText.classList.remove("opened");
    ppText.classList.remove("opened");
    checkButtons();
  });
  paypal.addEventListener("click", () => {
    //Buttons
    paypal.classList.add("active");
    cc.classList.remove("active");
    mobilepay.classList.remove("active");

    //Text Below
    ppText.classList.add("opened");
    ccText.classList.remove("opened");
    mpText.classList.remove("opened");
    checkButtons();
  });

  mobilepay.addEventListener("click", () => {
    mobilepay.classList.add("active");
    cc.classList.remove("active");
    paypal.classList.remove("active");
    //
    mpText.classList.add("opened");
    ppText.classList.remove("opened");
    ccText.classList.remove("opened");
    checkButtons();
  });

  getRestDB();
}

function getRestDB() {
  console.log("GET");
  fetch("https://voltcustomers-f457.restdb.io/rest/customer-details", {
    method: "get",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "x-apikey": "5ca48775df5d634f46ecb225",
      "cache-control": "no-cache"
    }
  })
    .then(e => e.json())
    .then(e => checkForCorrctUser(e));
}

function checkForCorrctUser(e) {
  let params = new URL(window.location).searchParams;
  let id = params.get("id");

  e.forEach(user => {
    if (user.id == id) {
      updateSummary(user);
    }
  });
}

function updateSummary(user) {
  console.log(user);
  const swapService = 179;
  const voltCharger = 200;
  let chargerTotal = 1;
  let swapServiceTotal = 1;
  let sum;

  document.querySelector("#productAmount1").textContent = user.charger + "x";
  document.querySelector("#productAmount2").textContent = user.service + "x";
  swapServiceTotal = user.service * swapService;
  chargerTotal = user.charger * voltCharger;
  document.querySelector("#priceSpan1").textContent = swapServiceTotal;
  document.querySelector("#priceSpan2").textContent = chargerTotal;
  let moms = ((swapServiceTotal + chargerTotal) / 100) * 25;
  document.querySelector("#momsValue").textContent = moms + ",- DKK";
  sum = moms + swapServiceTotal + chargerTotal;
  document.querySelector("#totalValue").textContent = sum;

  document.querySelector("#complete-purchase").addEventListener("click", () => {
    updateUser(user);
  });
}

function updateUser(user) {
  let inputCcn = document.querySelector("#ccNum").value;
  let inputMonth = document.querySelector("#ccMonth").value;
  let inputYear = document.querySelector("#ccYear").value;
  let inputccCvc = document.querySelector("#ccCvc").value;
  let inputName = document.querySelector("#ccName").value;

  const data = {
    _id: user._id,
    service: user.service,
    id: user.id,
    charger: user.charger,
    total: user.total,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    country: "-placeholder country-",
    zipCode: "-placeholder zipCode",
    phoneNumber: user.phoneNumber,
    password: user.password,
    ccNumber: inputCcn,
    ccYear: inputYear,
    ccMonth: inputMonth,
    ccName: inputName,
    ccCvv: inputccCvc
  };

  updateFunc(data);
}

function updateFunc(data) {
  console.log("Update");
  console.log(data);

  let postData = JSON.stringify(data);

  fetch(
    "https://voltcustomers-f457.restdb.io/rest/customer-details/" + data._id,
    {
      method: "put",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "x-apikey": "5ca48775df5d634f46ecb225",
        "cache-control": "no-cache"
      },
      body: postData
    }
  )
    .then(d => d.json())
    .then(t => newPage());
}
function newPage() {
  console.log("DONE");
  window.location.assign("thanks.html");
}

function checkButtons() {
  if (cc.classList.contains("active") === true) {
    paypal.classList.remove("active");
    mobilepay.classList.remove("active");
  } else if (paypal.classList.contains("active") === true) {
    cc.classList.remove("active");
    mobilepay.classList.remove("active");
  } else {
    paypal.classList.remove("active");
    cc.classList.remove("active");
  }
}
