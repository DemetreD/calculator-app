"use strict";

const calculatorDisplay = document.querySelector('.display')
const buttons = document.querySelectorAll('.btn');

//functions
const addNumbers = (a,b) => a + b;

const subtractNumbers = (a,b) => a - b;

const multiplyNumbers = (a,b) => a * b;


const divideNumbers = (a,b) => {
    if (b === 0) {
        console.log("Cant divide by zero!");
    }else{
        return a / b;
    }
}

const operate = function(num1,num2,operator) {
 
    switch (operator) {
        case "+":
            return addNumbers(num1,num2);
        case "-":
            return subtractNumbers(num1,num2);
        case "*":
            return multiplyNumbers(num1,num2);
        case "/":
            return divideNumbers(num1,num2);
        default:
            return "Invalid operator";
    }
}


buttons.forEach(button =>{
    button.addEventListener('click', () => {
        if (calculatorDisplay.textContent === "0") {
            calculatorDisplay.textContent = button.dataset.value;
        }else {
            calculatorDisplay.textContent =  calculatorDisplay.textContent + button.dataset.value ;
        }
    });
});