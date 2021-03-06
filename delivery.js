"use strict";
let sum = 378;

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
      document.querySelector("#next").addEventListener("click", () => {
        updateUser(user);
      });
    }
  });
}
function updateSummary(user) {
  console.log(user);
  const swapService = 179;
  const voltCharger = 200;
  let chargerTotal = 1;
  let swapServiceTotal = 1;

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

  document.querySelector("#selectMethod1").addEventListener("click", e => {
    e.preventDefault();
    updateSummaryclick1(user);
    console.log("CLICK");
  });

  document.querySelector("#selectMethod2").addEventListener("click", e => {
    e.preventDefault();
    updateSummaryClick2(user);
    console.log("CLICK");
  });
}

function updateSummaryclick1(user) {
  document.querySelector("#selectMethod1").classList.add("radioActive");
  document.querySelector("#selectMethod2").classList.remove("radioActive");
  console.log("+50");
  document.querySelector("#addDelivery").style.opacity = 0;
  sum = parseInt(sum - 50);
  console.log(sum);

  document.querySelector("#totalValue").textContent = sum;
}
function updateSummaryClick2(user) {
  document.querySelector("#selectMethod2").classList.add("radioActive");
  document.querySelector("#selectMethod1").classList.remove("radioActive");
  console.log("-50");
  document.querySelector("#addDelivery").style.opacity = 1;
  sum = parseInt(sum + 50);
  console.log(sum);

  document.querySelector("#totalValue").textContent = sum;
}
function updateUser(user) {
  console.log(user);
  window.location.assign("checkout.html?id=" + user.id);
}
