const displayWindow = document.getElementById('window');
const allButtons = document.querySelectorAll('.calc-button');
const equalButton = document.getElementById('=');
const clearButton = document.getElementById('C');
const operators = ['+', '-', 'x', '÷'];

// Check if equation is already in calculator.
function isCalcReady(windowStr) {
    const escapedOperators = operators.map(op => op.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')).join('|');
    const regex = new RegExp(`^\\s*?[0-9.]+\\s+(${escapedOperators})\\s+[0-9.]+[^\\s]*$`);
    return regex.test(windowStr.trim());
}

//Operate function handles the string in the window and the math. 
function operate(arr) {
    const a = parseFloat(arr[0]);
    const op = arr[1];
    const b = parseFloat(arr[2]);
    let result;
    switch (op) {
        case '+':
            result = (a + b);
            break;
        case '-':
            result = (a - b);
            break;
        case '÷':
            if (b === 0) {
                return "SELF DESTRUCT"
            }
            result = (a / b);
            break;
        case 'x':
            result = (a * b);
            break;
        }
    
    // Limiting decimal places. Converting long number to exponential. 
    const resultCheck = result.toLocaleString('en-US', {
        maximumFractionDigits: 3, 
        useGrouping: false
    });
    
    if (resultCheck.length > 12) {
        return result.toExponential(4);
    } 
    return resultCheck
}

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // Trim for operator check. 
        const buttonText = e.target.textContent.trim(); 
        //Trim for display check of equation. 
        let windowStr = displayWindow.textContent.trim(); 

        // Clear button.
        if (buttonText === 'C') {
            displayWindow.textContent = '';
            return;
        }
        // Operator buttons. 
        if (operators.includes(buttonText)) {
            const newOP = buttonText;
            // Check if a full equation is ready in the window.
            if (isCalcReady(windowStr)) {
                const windowArr = windowStr.split(" ");
                const calcInWindow = operate(windowArr);
                if (calcInWindow === "SELF DESTRUCT") {
                    displayWindow.textContent = calcInWindow;
                    return;
                }
                // New string is: result+space+op+space
                displayWindow.textContent = `${calcInWindow} ${newOP} `;
            } else {
                // If not ready, just append the new operator with spaces.
                const lastSegment = windowStr.split(" ").pop();
                // Prevent adding an operator if the last segment is already an operator.
                if (!operators.includes(lastSegment)) {
                     // Spaces added for split on string. 
                     displayWindow.textContent += ` ${newOP} `; 
                }
            }
            return;
        }
        // Equals button.
        if (buttonText === '=') {
            if (isCalcReady(windowStr)) {
                const windowArr = windowStr.split(" ");
                displayWindow.textContent = operate(windowArr);
            }
            return;
        }
        displayWindow.textContent += buttonText; 
    })
})







