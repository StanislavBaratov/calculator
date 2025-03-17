const FIRST_OPERAND = 0;
const SECOND_OPERAND = 1;

const calculator = {
    display: document.querySelector('input'),
    buttons: document.querySelectorAll('button'),
    firstOperand: 0,
    secondOperand: 0,
    state: FIRST_OPERAND,
    currentOperator: null,

    addDigit: function(digit) {
        console.log(this.display);
        this.display.value += digit;
    },

    removeDigit: function() {
        if (this.display.value) {
            this.display.value = this.display.value.slice(0, this.display.value.length-1);
        }
    },

    handleSpecial: function(token) {
        switch (token) {
           case 'backspace':
            this.removeDigit();
            break;
        }
    },

    buttonPressed: function(event) {
        console.log(event.target.id);
        console.log(event.target.className);
        if (event.target.className === 'digit') {
            calculator.addDigit(event.target.id);
        } else if (event.target.className === 'special') {
            calculator.handleSpecial(event.target.id);
        }
    },

    resetCalculator: function() {
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.state = FIRST_OPERAND;
        this.currentOperator = null;
    },

    initCalculator: function() {
        this.buttons.forEach((item) => item.addEventListener('click', this.buttonPressed));
    }
}

calculator.initCalculator();
calculator.resetCalculator();
