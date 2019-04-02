"use strict";
let myFlag = false;
window.addEventListener("DOMContentLoaded", init);
function init() {
  console.log("INIT");
  document.querySelector("#selectMethod1").addEventListener("click", () => {
    document.querySelector("#selectMethod1").classList.add("radioActive");
    document.querySelector("#selectMethod2").classList.remove("radioActive");
  });
  document.querySelector("#selectMethod2").addEventListener("click", () => {
    document.querySelector("#selectMethod2").classList.add("radioActive");
    document.querySelector("#selectMethod1").classList.remove("radioActive");
  });
  updateSummary();
}
function updateSummary() {
  console.log("UPDATE");
}
