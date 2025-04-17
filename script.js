let firstNumber = "";
let secondNumber = "";
let currentOperator = "";
let result = "";
let shouldResetDisplay = false;

const display = document.getElementById("display");

// Functions for basic operations
function addition(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error";
    return a / b;
}

// Operate based on operator
function operate(num1, operator, num2) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    switch (operator) {
        case '+':
            return addition(num1, num2);
        case '-':
            return subtract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return null;
    }
}

// Handle digit press
function inputDigit(digit) {
    if (shouldResetDisplay) {
        display.textContent = digit;
        shouldResetDisplay = false;
    } else {
        display.textContent += digit;
    }
}

// Handle operator press
function inputOperator(operator) {
    if (firstNumber === "") {
        firstNumber = display.textContent;
        currentOperator = operator;
        shouldResetDisplay = true;
    } else if (currentOperator !== "") {
        secondNumber = display.textContent;
        result = operate(firstNumber, currentOperator, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result;
        currentOperator = operator;
        shouldResetDisplay = true;
    }
}

// Handle equals press
function inputEquals() {
    if (firstNumber !== "" && currentOperator !== "") {
        secondNumber = display.textContent;
        result = operate(firstNumber, currentOperator, secondNumber);
        display.textContent = roundResult(result);
        firstNumber = result;
        secondNumber = "";
        currentOperator = "";
        shouldResetDisplay = true;
    }
}

// Handle clear
function clearCalculator() {
    firstNumber = "";
    secondNumber = "";
    currentOperator = "";
    result = "";
    display.textContent = "";
}

// Optional: round long decimals
function roundResult(num) {
    if (typeof num === "number") {
        return Math.round(num * 100000) / 100000; // 5 decimal places
    }
    return num;
}

// Add event listeners to buttons
document.querySelectorAll("[data-number]").forEach(button => {
    button.addEventListener("click", () => inputDigit(button.textContent));
});

document.querySelectorAll("[data-operator]").forEach(button => {
    button.addEventListener("click", () => inputOperator(button.dataset.operator));
});

document.getElementById("equals").addEventListener("click", inputEquals);
document.getElementById("clear").addEventListener("click", clearCalculator);
