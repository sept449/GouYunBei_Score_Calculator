document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('button');
    let currentInput = '';
    let currentOperator = '';
    let previousInput = '';
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value >= '0' && value <= '9' || value === '.') {
                handleNumber(value);
            } else if (value === 'C') {
                clear();
            } else if (value === '±') {
                toggleSign();
            } else if (value === '=') {
                calculate();
            } else {
                handleOperator(value);
            }
        });
    });

    function handleNumber(num) {
        if (shouldResetDisplay) {
            display.value = num;
            shouldResetDisplay = false;
        } else {
            display.value = display.value === '0' ? num : display.value + num;
        }
        currentInput = display.value;
    }

    function handleOperator(op) {
        if (currentInput === '') return;
        
        if (previousInput !== '') {
            calculate();
        }
        
        currentOperator = op;
        previousInput = currentInput;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (currentInput === '' || previousInput === '' || currentOperator === '') return;

        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        let result;

        switch (currentOperator) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    display.value = '错误';
                    return;
                }
                result = prev / current;
                break;
        }

        display.value = result.toString();
        currentInput = result.toString();
        previousInput = '';
        currentOperator = '';
    }

    function clear() {
        display.value = '0';
        currentInput = '';
        previousInput = '';
        currentOperator = '';
        shouldResetDisplay = false;
    }

    function toggleSign() {
        if (currentInput !== '') {
            display.value = (-parseFloat(display.value)).toString();
            currentInput = display.value;
        }
    }
}); 