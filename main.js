"use strict";

const small = document.querySelectorAll("small");
const label = document.querySelectorAll("label");
const output = document.querySelector("#hr-arrow");
const invalidDay = document.querySelector("#day-error");
const invalidMonth = document.querySelector("#month-error");
const invalidYear = document.querySelector("#year-error");
const btn = document.querySelector("#arrow");
const input = document.querySelectorAll("input");
const yearResult = document.querySelectorAll(".result")[0];
const monthResult = document.querySelectorAll(".result")[1];
const dayResult = document.querySelectorAll(".result")[2];

function ageCalculation() {
  let inputDate = new Date(
    `${input[2].value}-${input[1].value}-${input[0].value}`
  );
  let currentDate = new Date();

  // calculate the difference
  let resultMs = currentDate.getTime() - inputDate.getTime();

  // convert into final results
  const msYear = 1000 * 60 * 60 * 24 * 365.25;
  const msMonth = msYear / 12;
  const msDay = 1000 * 60 * 60 * 24;

  const difYear = Math.floor(resultMs / msYear);
  const difMonth = Math.floor((resultMs % msYear) / msMonth);
  const difDay = Math.floor(((resultMs % msYear) % msMonth) / msDay);

  // DOM
  yearResult.innerHTML = difYear;
  monthResult.innerHTML = difMonth;
  dayResult.innerHTML = difDay;
}

function errorState(index) {
  small[index].classList.remove("hide");
  input[index].style.borderColor = "hsl(0, 100%, 67%)";
  label[index].style.color = "hsl(0, 100%, 67%)";
  dayResult.textContent = "- -";
  monthResult.textContent = "- -";
  yearResult.textContent = "- -";
}

function errorReset(index) {
  small[index].classList.add("hide");
  label[index].style.color = "hsl(0, 1%, 44%)";
  input[index].style.borderColor = "hsl(0, 0%, 86%)";
}

function emptyCheck() {
  if (input[0].value === "") {
    small[0].textContent = "This field is required";
    errorState(0);
  } else {
    errorReset(0);
  }
  if (input[1].value === "") {
    small[1].textContent = "This field is required";
    errorState(1);
  } else {
    errorReset(1);
  }
  if (input[2].value === "") {
    small[2].textContent = "This field is required";
    errorState(2);
  } else {
    errorReset(2);
  }
}

function invalidNumber() {
  let day = parseInt(input[0].value);
  let month = parseInt(input[1].value);
  let year = parseInt(input[2].value);
  let currentDate = new Date();

  if (!isNaN(day) && (day < 1 || day > 31)) {
    small[0].textContent = "Must be a valid day";
    errorState(0);
  } else if (isNaN(day) && input[0].value !== "") {
    small[0].textContent = "Must be a valid day";
    errorState(0);
  }

  if (!isNaN(month) && (month < 1 || month > 12)) {
    small[1].textContent = "Must be a valid month";
    errorState(1);
  } else if (isNaN(month) && input[1].value !== "") {
    small[1].textContent = "Must be a valid month";
    errorState(1);
  }

  if (!isNaN(year) && year > currentDate.getFullYear()) {
    small[2].textContent = "Must be in the past";
    errorState(2);
  } else if (isNaN(year) && input[2].value !== "") {
    small[2].textContent = "Must be in the past";
    errorState(2);
  }
  if (
    day == "31" &&
    (month == "4" || month == "6" || month == "9" || month == "11")
  ) {
    small[0].textContent = "Must be a valid day";
      errorState(0);
      errorState(1);
      errorState(2);
  }
  if (month == "2" && (day == "30" || day == "31")) {
    small[0].textContent = "Must be a valid day";
      errorState(0);
      errorState(1);
      errorState(2);
  }
}

btn.addEventListener("click", (e) => {
  ageCalculation();
  emptyCheck();
  invalidNumber();
  if (input[0].value != "" && parseInt(input[0].value) < 10) {
    input[0].value = input[0].value.padStart(2, "0");
  }
  if (input[1].value != "" && parseInt(input[1].value) < 10) {
    input[1].value = input[1].value.padStart(2, "0");
  }
});
