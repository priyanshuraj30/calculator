document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.button');
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let waitForSecondOperand = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    function handleNumber(number) {
        if (waitForSecondOperand) {
            currentInput = number;
            waitForSecondOperand = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
    }

    function handleOperator(nextOperator) {
        const inputValue = parseFloat(currentInput);

        if (operator && waitForSecondOperand) {
            operator = nextOperator;
            return;
        }

        if (firstOperand === null) {
            firstOperand = inputValue;
        } else if (operator) {
            const result = performCalculation[operator](firstOperand, inputValue);
            currentInput = String(result);
            firstOperand = result;
        }

        waitForSecondOperand = true;
        operator = nextOperator;
    }

    const performCalculation = {
        '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
        '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
        '×': (firstOperand, secondOperand) => firstOperand * secondOperand,
        '÷': (firstOperand, secondOperand) => firstOperand / secondOperand,
        '%': (firstOperand, secondOperand) => firstOperand % secondOperand,
    };

    function resetCalculator() {
        currentInput = '0';
        firstOperand = null;
        operator = null;
        waitForSecondOperand = false;
    }

    function handleDecimal() {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    }

    function handlePlusMinus() {
        currentInput = currentInput.startsWith('-') ? currentInput.slice(1) : '-' + currentInput;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            switch (button.id) {
                case 'zero':
                case 'one':
                case 'two':
                case 'three':
                case 'four':
                case 'five':
                case 'six':
                case 'seven':
                case 'eight':
                case 'nine':
                    handleNumber(button.textContent);
                    break;
                case 'add':
                case 'subtract':
                case 'multiply':
                case 'divide':
                case 'percent':
                    handleOperator(button.textContent);
                    break;
                case 'decimal':
                    handleDecimal();
                    break;
                case 'clear':
                    resetCalculator();
                    break;
                case 'plus-minus':
                    handlePlusMinus();
                    break;
                case 'equals':
                    handleOperator(operator);
                    break;
                default:
                    break;
            }
            updateDisplay();
        });
    });
});
