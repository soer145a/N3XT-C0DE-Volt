"use strict";
import TweenMax from "gsap/TweenMax";
import Draggable from "gsap/Draggable";

window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("INIT");
  if(document.querySelector("#button1")){
  document.querySelector("#button1").addEventListener("click", () => {
    document.querySelector("#button1").classList.add("buttonActive");
    document.querySelector("#button2").classList.remove("buttonActive");
  });
  document.querySelector("#button2").addEventListener("click", () => {
    document.querySelector("#button2").classList.add("buttonActive");
    document.querySelector("#button1").classList.remove("buttonActive");
  });
}
}
