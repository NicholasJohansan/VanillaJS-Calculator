
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