const FIRST_OPERAND = 0;
const SECOND_OPERAND = 1;

const calculator = {
    display: document.querySelector('.display'),
    buttons: document.querySelectorAll('button'),
    firstOperand: 0,
    secondOperand: 0,
    state: FIRST_OPERAND,
    currentOperator: null,

    keyPressed: function(event) {
        console.log(event.target.id)
    },

    resetCalculator: function() {
        this.firstOperand = 0;
        this.secondOperand = 0;
        this.state = FIRST_OPERAND;
        this.currentOperator = null;
    },

    initCalculator: function() {
        this.buttons.forEach((item) => item.addEventListener('click', this.keyPressed));
    }
}

calculator.initCalculator();
calculator.resetCalculator();
