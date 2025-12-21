const displayWindow = document.getElementById('window');
const allButtons = document.querySelectorAll('.calc-button');

allButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent;
        displayWindow.textContent += buttonText;
    })
})

function operate(arr) {
    const a = parseFloat(arr[0]);
    const op = arr[1];
    const b = parseFloat(arr[2]);
    
    switch (op) {
        case '+':
            return (a + b);
        case '-':
            return (a - b);
        case '÷':
            if (b === 0) {
                return "ERROR, SEFL DESTRUCT"
            }
            return (a / b);
        case 'x':
            return (a * b);
    }
}

const equalButton = document.getElementById('=');

equalButton.addEventListener('click', () => {
    const windowStr = displayWindow.textContent;
    const windowArr = windowStr.split(" ");
    displayWindow.textContent = operate(windowArr);
});



const clearButton = document.getElementById('C');

clearButton.addEventListener('click', () => {
    displayWindow.textContent = '';
});





