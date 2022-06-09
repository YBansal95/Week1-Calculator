const themeToggleBtn = document.querySelector(".theme-toggler");
const calc = document.querySelector(".calculator");
const output = document.querySelector(".output");
const bod = document.querySelector(".bood");
const prevop = document.querySelector(".previous-operand");
const currop = document.querySelector(".current-operand");
const btn1 = document.querySelectorAll(".btn1");
const btn2 = document.querySelectorAll(".btn2");
const toggleIcon = document.querySelector(".toggler-icon");

let isDark = true;

themeToggleBtn.onclick = () =>
{
  calc.classList.toggle("dark");
  themeToggleBtn.classList.toggle("active");
  output.classList.toggle("dark");
  bod.classList.toggle("dark");
  prevop.classList.toggle("dark");
  currop.classList.toggle("dark");
  btn1.forEach(button =>
  {
    button.classList.toggle("dark");
  })
  btn2.forEach(button =>
  {
    button.classList.toggle("dark");
  })
  isDark = !isDark;
}