"use strict";
import TweenMax from "gsap/TweenMax";
import Draggable from "gsap/Draggable";
import { url } from "inspector";
import { URLSearchParams } from "url";

const swapService = 179;
const voltCharger = 200;

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
  let myParams = new URLSearchParams();
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
  let swapServiceTotal = input1.value * swapService;
  let chargerTotal = input2.value * voltCharger;
  document.querySelector("#priceSpan1").textContent = swapServiceTotal;
  document.querySelector("#priceSpan2").textContent = chargerTotal;
  let moms = ((swapServiceTotal + chargerTotal) / 100) * 25;
  document.querySelector("#momsValue").textContent = moms + ",- DKK";
  let sum = moms + swapServiceTotal + chargerTotal;
  document.querySelector("#totalValue").textContent = sum;
  addToURL(input1.value, input2.value, sum);
}
function addToURL(value1, value2, value3) {
  let localId =
    Math.random()
      .toString(36)
      .substring(2, 15) +
    Math.random()
      .toString(36)
      .substring(2, 15);
  /*  const customer = {
    id: localId,
    service: value1,
    charger: value2,
    total: value3,
    firstName: "",
    lastName: "",
    email: "",
    country: "",
    zipCode: "",
    phoneNumber: "",
    password: "",
    creditCardNumber: "",
    creditCardYear: "",
    creditCardMonth: "",
    creditCardCvv: ""
  };
  myParams.append("localId" + localId);
  console.log(customer); */
}
