
let calculatorDisplayText = "";
const calculatorDisplay = document.querySelector("#display");
const calculatorClearButton = document.querySelector("#clear_button")
const calculatorNumberButtons = document.querySelectorAll("button[data-number]");
const calculatorOperatorButtons = document.querySelectorAll("button[data-operator]");

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => ({
  "+": add(a, b),
  "-": subtract(a, b),
  "*": multiply(a, b),
  "/": divide(a, b)
}[operator]);

const updateDisplay = (text) => {
  calculatorDisplayText = text;
  calculatorDisplay.innerText = calculatorDisplayText;
};

const addToDisplay = (text) => {
  updateDisplay(`${calculatorDisplayText}${text}`);
};

const clearDisplay = () => updateDisplay("");

calculatorNumberButtons.forEach(button => {
  button.addEventListener("click", function() {
    addToDisplay(this.innerText);
  });
});

calculatorOperatorButtons.forEach(button => {
  button.addEventListener("click", function() {
    addToDisplay(` ${this.innerText} `);
  });
});

calculatorClearButton.addEventListener('click', clearDisplay);

