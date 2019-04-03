"use strict";
window.addEventListener("DOMContentLoaded", init);

function init() {
  console.log("INIT");

  let params = new URL(document.location).searchParams;
  let charger = params.get("chargers"); // is the string "Jonathan Smith".
  let service = params.get("service"); // is the number 18
  let total = params.get("total");
  let id = params.get("id");

  console.log(charger + " " + service + " " + total + " " + id);
  console.log(id);
}
