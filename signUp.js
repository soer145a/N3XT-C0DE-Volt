"use strict";
window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("INIT");

  let params = new URL(window.location).searchParams;
  let charger = params.get("chargers");
  let service = params.get("service");
  let total = params.get("total");
  let id = params.get("id");

  console.log(charger + " " + service + " " + total + " " + id);
  let urlString =
    "?id=" +
    id +
    "&chargers=" +
    charger +
    "&service=" +
    service +
    "&total=" +
    total;

  document.querySelector("#signup-email-btn").addEventListener("click", () => {
    nextPage(urlString);
  });
}
function nextPage(param) {
  window.location.assign("signUp_email.html" + param);
}
