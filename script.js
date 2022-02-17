
let calculatorDisplayText = "";
let firstNumber = "";
let secondNumber = "";
let selectedOperator = "";

const calculatorDisplay = document.querySelector("#display");
const calculatorClearButton = document.querySelector("#clear_button");
const calculatorEqualButton = document.querySelector("#equal_button");
const calculatorNumberButtons = document.querySelectorAll("button[data-number]");
const calculatorOperatorButtons = document.querySelectorAll("button[data-operator]");

const roundCorrectly = number => parseFloat(Math.round(`${number}e8`) + `e-8`);

const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

const operate = (a, operator, b) => {
  a = Number(a);
  b = Number(b);
  const result = {
  "+": add(a, b),
  "-": subtract(a, b),
  "*": multiply(a, b),
  "/": divide(a, b)
  }[operator];
  return roundCorrectly(result);
};

const getCalculatorExpression = () => {
  let [operand1, operator, operand2] = calculatorDisplayText.split(" ");
  return {
    operand1,
    operator,
    operand2
  };
};

const resetCalculatorVariables = (firstValue = "0") => {
  firstNumber = firstValue;
  secondNumber = "";
  selectedOperator = "";
}

const removeTrailingZeros = (text) => text.charAt(0) === "0" && text.length > 1 ? text.slice(1) : text;

const formatDisplayText = (text) => {
  let [operand1, operator, operand2] = String(text).split(" ");
  operand1 = !operand1 ? "" : removeTrailingZeros(operand1);
  operand2 = !operand2 ? "" : removeTrailingZeros(operand2);
  operator = !operator ? "" : operator;
  let formattedText = "";
  if (operand1) formattedText += operand1;
  if (operator) formattedText += ` ${operator} `;
  if (operand2) formattedText += operand2;
  return formattedText;
}

const updateDisplay = (text) => {
  calculatorDisplayText = formatDisplayText(text);
  calculatorDisplay.innerText = calculatorDisplayText;
};

const addToDisplay = (text) => {
  updateDisplay(`${calculatorDisplayText}${text}`);
};

const clearDisplay = () => {
  calculatorDisplayText = "0";
  calculatorDisplay.innerText = "0";
  resetCalculatorVariables();
};

const evaluateCalculatorExpression = () => {
  let { operand1, operand2 } = getCalculatorExpression();
  firstNumber = operand1 === "" ? 0 : operand1;
  secondNumber = operand2 === "" ? firstNumber : operand2;
  const result = selectedOperator === "" ? firstNumber : operate(firstNumber, selectedOperator, secondNumber);
  updateDisplay(result);
  resetCalculatorVariables(result);
};

calculatorNumberButtons.forEach(button => {
  button.addEventListener("click", function() {
    addToDisplay(this.innerText);
  });
});

calculatorOperatorButtons.forEach(button => {
  button.addEventListener("click", function() {
    operator = this.innerText;
    if (selectedOperator !== "") {
      evaluateCalculatorExpression();
    }
    selectedOperator = operator;
    addToDisplay(` ${this.innerText} `);
  });
});

calculatorClearButton.addEventListener("click", clearDisplay);
calculatorEqualButton.addEventListener("click", evaluateCalculatorExpression);
