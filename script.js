"use strict";

const calculatorDisplay = document.querySelector('.display')
const buttons = document.querySelectorAll('.btn');
const errorMessage = document.getElementById('errorMessage');
const decimalBtn = document.getElementById('decimal');

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

const updateDecimalButton = () => {
    if (operator === "") {
        decimalBtn.disabled = firstNumber.includes(".");
    }else {
        decimalBtn.disabled = secondNumber.includes(".");
    }
}


const handleEquals = () => {
     if (firstNumber !== "" && operator !== "" && secondNumber !== "") {
        const result = operate(Number(firstNumber), Number(secondNumber), operator)
                
        if(result === "Error") {
            errorMessage.textContent = "Can't divide by zero";
            errorMessage.classList.remove('hide');  
            calculatorDisplay.textContent = "0";
            firstNumber = "";
            operator = "";
            secondNumber ="";
            return;
        }
                
        const rounded = parseFloat(result.toFixed(10));
        calculatorDisplay.textContent = rounded;
        firstNumber = String(rounded);
        secondNumber = "";
        operator = "";

    }
}

const handleBackspace = () => {
     if(secondNumber !== ""){
        secondNumber = secondNumber.slice(0,-1);

        if (secondNumber !== "") {
            calculatorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`
        }else {
            calculatorDisplay.textContent = `${firstNumber} ${operator}`;
            }        
        }else if (operator !== ""){
            operator = "";
            calculatorDisplay.textContent = firstNumber;
        }else if(firstNumber !== ""){
            firstNumber = firstNumber.slice(0,-1);
            calculatorDisplay.textContent = firstNumber !== "" ? firstNumber : "0";
        }

        updateDecimalButton();
}

const clearDisplay = () => {
    calculatorDisplay.textContent = "0";
    firstNumber = "";
    operator = "";
    secondNumber ="";
    updateDecimalButton();
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
                if (value === ".") {
                    updateDecimalButton();
                }
            }else {
                secondNumber += value;
                calculatorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
                if (value === ".") {
                    updateDecimalButton();
                }
            }
           
        }else if(button.classList.contains('operator')){
            decimalBtn.disabled = false;
            if(firstNumber !== "" && secondNumber !== ""){
                const result = operate(Number(firstNumber), Number(secondNumber), operator);
                const rounded = parseFloat(result.toFixed(10));
                firstNumber = String(rounded);
                secondNumber = "";
                operator = value;
                calculatorDisplay.textContent = `${firstNumber} ${operator}`;
            }else if (firstNumber !== "") {
                operator = value;
                calculatorDisplay.textContent = `${firstNumber} ${operator}`;
            }

          
        }else if(button.classList.contains('equals')) {
            handleEquals();
           
        }else if(button.classList.contains('backspace')){
            handleBackspace();
        }
        else if(button.classList.contains('clear')) {
            clearDisplay();
        }
        
    });
});

document.addEventListener('keydown', (e) => {
    console.log(e.key);

    if(e.key >= "0" && e.key <= "9") {
        if(operator === ""){
                firstNumber += e.key;
                calculatorDisplay.textContent = firstNumber;
                if (e.key === ".") {
                    updateDecimalButton();
                }
            }else {
                secondNumber += e.key;
                calculatorDisplay.textContent = `${firstNumber} ${operator} ${secondNumber}`;
                if (e.key === ".") {
                    updateDecimalButton();
                }
            }
    }else if(e.key === 'Enter'){
        handleEquals();
    }else if(e.key === 'Backspace'){
         handleBackspace();
    }

    
    
});