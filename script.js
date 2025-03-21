const calculator = {
    display: document.querySelector('input'),
    buttons: document.querySelectorAll('button'),
    firstOperand: 0,
    secondOperand: 0,
    operatorPressed: false,
    currentOperator: null,

    addDigit: function(digit) {
        if (this.operatorPressed)  {
            this.display.value = digit;
            this.operatorPressed = false;
        } else {
            this.display.value += digit;
        }
    },

    removeDigit: function() {
        if (this.display.value) {
            this.display.value = this.display.value.slice(0, this.display.value.length-1);
        }
    },

    evaluateExpression: function() {
        const secondOperand = parseFloat(this.display.value);
        const firstOperand = parseFloat(this.firstOperand);

        switch (this.currentOperator) {
            case 'add':
            case '+':
                return firstOperand + secondOperand;
                break;
            case 'sub':
            case '-':
                return firstOperand - secondOperand;
                break;
            case 'mul':
            case '*':
                return firstOperand * secondOperand;
                break;
            case 'div':
            case '/':
                return firstOperand / secondOperand;
                break;
            default:
                return firstOperand;
        }
    },

    handleSpecial: function(token) {
        switch (token) {
            case 'backspace':
            case 'Delete':
                this.removeDigit();
                break;
            case 'equal':
            case '=':
                this.firstOperand = this.evaluateExpression();
                this.currentOperator = null;
                this.operatorPressed = true;
                this.display.value = this.firstOperand;
                break;
            case 'clear-all':
                this.resetCalculator();
                break;
            case 'clear':
                this.display.value = '';
                break;
            case 'sqrt':
            case 'Backslash':
                this.display.value = Math.sqrt(parseFloat(this.display.value));
                break;
        }
    },

    setOperator: function(operator) {
        if (this.currentOperator && !this.operatorPressed) {
            this.display.value = this.evaluateExpression();
        }

        this.currentOperator = operator;
        this.firstOperand = this.display.value;
        this.operatorPressed = true;
    },

    buttonPressed: function(event) {
        if (event.target.className === 'digit') {
            calculator.addDigit(event.target.id);
        } else if (event.target.className === 'special') {
            calculator.handleSpecial(event.target.id);
        } else if (event.target.className === 'operation') {
            calculator.setOperator(event.target.id);
        } else {
            alert('This button type does not exist!');
        }
    },

    keyPressed: function(event) {
        if (/\d/.test(event.key)) {
            calculator.addDigit(event.key);
        } else if (event.key === 'Enter' || event.key == '=') {
            calculator.handleSpecial('equal');
        } else if (event.key === 'Delete') {
            calculator.removeDigit();
        } else if (/[-//*+]/.test(event.key)) {
            calculator.setOperator(event.key);
        } else if (event.code === 'Backslash') { // event.code === Backslash, event.key = \\
            calculator.handleSpecial(event.code);
        }
    },

    resetCalculator: function() {
        this.display.value = '';
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.operatorPressed = false;
        this.currentOperator = null;
    },

    initCalculator: function() {
        this.buttons.forEach((item) => item.addEventListener('click', this.buttonPressed));
        document.querySelector('html').addEventListener('keypress', this.keyPressed);
    }
}

calculator.initCalculator();
calculator.resetCalculator();
