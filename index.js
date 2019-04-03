"use strict";
import TweenMax from "gsap/TweenMax";
import Draggable from "gsap/Draggable";

const swapService = 179;
const voltCharger = 200;
let chargerTotal;
let swapServiceTotal;
let sum;

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("INIT");
  document.querySelector("#button1").addEventListener("click", () => {
    document.querySelector("#button1").classList.add("buttonActive");
    document.querySelector("#button2").classList.remove("buttonActive");
    checkButtons();
  });
  document.querySelector("#button2").addEventListener("click", () => {
    document.querySelector("#button2").classList.add("buttonActive");
    document.querySelector("#button1").classList.remove("buttonActive");
    checkButtons();
  });
  document
    .querySelector("#quantityInput1")
    .addEventListener("change", updateSummary);
  document
    .querySelector("#quantityInput2")
    .addEventListener("change", updateSummary);
  document.querySelector("#next").addEventListener("click", addToURL);
}

function checkButtons() {
  console.log("check Buttons");
  let button1 = document.querySelector("#button1");

  if (button1.classList.contains("buttonActive") == true) {
    document.querySelector("#volt").style.opacity = 0;
    document.querySelector("#sumCard2").style.opacity = 0;
    document.querySelector("#quantityInput2").value = 0;
    updateSummary();
  } else {
    document.querySelector("#volt").style.opacity = 1;
    document.querySelector("#sumCard2").style.opacity = 1;
    document.querySelector("#quantityInput2").value = 1;
    updateSummary();
  }
}
function updateSummary() {
  let input1 = document.querySelector("#quantityInput1");
  let input2 = document.querySelector("#quantityInput2");
  console.log("Update Sumary");

  document.querySelector("#productAmount1").textContent = input1.value + "x";
  document.querySelector("#productAmount2").textContent = input2.value + "x";
  swapServiceTotal = input1.value * swapService;
  chargerTotal = input2.value * voltCharger;
  document.querySelector("#priceSpan1").textContent = swapServiceTotal;
  document.querySelector("#priceSpan2").textContent = chargerTotal;
  let moms = ((swapServiceTotal + chargerTotal) / 100) * 25;
  document.querySelector("#momsValue").textContent = moms + ",- DKK";
  sum = moms + swapServiceTotal + chargerTotal;
  document.querySelector("#totalValue").textContent = sum;
}

function addToURL() {
  let localId =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);

  let urlString =
    "?&id=" +
    localId +
    "&chargers=" +
    chargerTotal +
    "&service=" +
    swapServiceTotal +
    "&total=" +
    sum;
  console.log(urlString);
  window.location.assign("signUp.html" + urlString);
}
