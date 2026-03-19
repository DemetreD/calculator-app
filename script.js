"use strict";

const calculatorDisplay = document.querySelector('.display')
const buttons = document.querySelectorAll('.btn');
const errorMessage = document.getElementById('errorMessage');


//functions
const addNumbers = (a,b) => a + b;

const subtractNumbers = (a,b) => a - b;

const multiplyNumbers = (a,b) => a * b;


const divideNumbers = (a,b) => {
    if (b === 0) {
        return "Error";
        
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

let firstNumber = "";
let operator = "";
let secondNumber = "";



buttons.forEach(button =>{
    button.addEventListener('click', () => {
        const value = button.dataset.value;

        errorMessage.classList.add('hide');

        if (button.classList.contains('number')) {
            if(operator === ""){
                firstNumber += value;
                calculatorDisplay.textContent = firstNumber;
            }else {
                secondNumber += value;
                calculatorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
            }
           
        }else if(button.classList.contains('operator')){
            if(firstNumber !== "" && secondNumber !== ""){
                const result = operate(Number(firstNumber), Number(secondNumber), operator);
                firstNumber = String(result);
                secondNumber = "";
                operator = value;
                calculatorDisplay.textContent = `${firstNumber} ${operator}`;
            }else if (firstNumber !== "") {
                operator = value;
                calculatorDisplay.textContent = `${firstNumber} ${operator}`;
            }

          
        }else if(button.classList.contains('equals')) {
            if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
                const result = operate(Number(firstNumber), Number(secondNumber), operator)
                calculatorDisplay.textContent = result;


                if(result === "Error") {
                    errorMessage.textContent = "Can't divide by zero";
                    errorMessage.classList.remove('hide');  
                    calculatorDisplay.textContent = "0";
                    firstNumber = "";
                    operator = "";
                    secondNumber ="";
                    return;
                }

                firstNumber = String(result);
                secondNumber = "";

            }
           
        }else if(button.classList.contains('clear')) {
            calculatorDisplay.textContent = "0";
            firstNumber = "";
            operator = "";
            secondNumber ="";
        }
        
    });
});

