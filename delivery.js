"use strict";

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("INIT");

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
    } else {
      console.log("Not me!");
    }
  });
}
function updateSummary(user) {
  console.log(user);
  const swapService = 179;
  const voltCharger = 200;
  let chargerTotal = 1;
  let swapServiceTotal = 1;
  let sum = 378;

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

  document.querySelector("#selectMethod1").addEventListener("click", () => {
    document.querySelector("#selectMethod1").classList.add("radioActive");
    document.querySelector("#selectMethod2").classList.remove("radioActive");
  });
  document.querySelector("#selectMethod2").addEventListener("click", () => {
    document.querySelector("#selectMethod2").classList.add("radioActive");
    document.querySelector("#selectMethod1").classList.remove("radioActive");
  });
}
