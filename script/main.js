import { simulate } from "./simulation.js"

const result = document.getElementById("result");
const summary = document.getElementById("summary");
const ref_error = document.getElementById("ref-error");


document.getElementById("form-btn").addEventListener("click", simulate);
document.getElementById("clear-btn").addEventListener("click", (e) => {
  e.preventDefault();
  result.classList.add("visually-hidden");
  summary.classList.add("visually-hidden");
  ref_error.classList.add("visually-hidden");
  document.getElementById("ref-string").value = "";
});



