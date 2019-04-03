"use strict";
window.addEventListener("DOMContentLoaded", init);

let cc = document.querySelector("#cc");
let paypal = document.querySelector("#paypal");
let mobilepay = document.querySelector("#mobilepay");

let ccText = document.querySelector("#cc-form");
let ppText = document.querySelector("#paypal-text");
let mpText = document.querySelector("#mobilepay-text");

function init(){
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
}

function checkButtons() {

    if (cc.classList.contains("active") === true) {
        paypal.classList.remove("active");
        mobilepay.classList.remove("active");

    } else if (paypal.classList.contains("active") === true){
        cc.classList.remove("active");
        mobilepay.classList.remove("active");


    } else {
        paypal.classList.remove("active");
        cc.classList.remove("active");
    }

}