// Global variables
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete');
const allClearButton = document.querySelector('[data-all-clear');
const previousTextElement = document.querySelector('[data-previous');
const currentTextElement = document.querySelector('[data-current');

class Calculator {
	constructor(previousTextElement, currentTextElement) {
		this.previousTextElement = previousTextElement;
		this.currentTextElement = currentTextElement;
		this.clear();
	}

	clear() {
		this.currentNumber = '';
		this.previousNumber = '';
		this.operator = undefined;
	}

	delete() {
		this.currentNumber = this.currentNumber.toString().slice(0, -1);
	}

	appendNumber(number) {
		// If it already exists a '.' then returns and doesn't add another '.'
		if(number === '.' && this.currentNumber.includes('.')) return;
		this.currentNumber = this.currentNumber.toString() + number.toString();
	}

	chooseOperation(operator) {
		if(this.currentNumber === '') return;
		if(this.previousNumber !== '') {
			this.compute();
		}
		this.operator = operator;
		this.previousNumber = this.currentNumber;
		this.currentNumber = '';
	}

	compute() {
		let computation;
		// parseFloat converts string to a number
		const prev = parseFloat(this.previousNumber);
		const current = parseFloat(this.currentNumber);
		
		if(isNaN(prev) || isNaN(current)) return;

		switch(this.operator) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			default:
				return;
		};

		this.currentNumber = computation;
		this.operator = undefined;
		this.previousNumber = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if(isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		};
		if(decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentTextElement.innerText = this.getDisplayNumber(this.currentNumber);
		this.operator != null ? this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.operator}` : this.previousTextElement.innerText = this.previousNumber;
	}
};

const calculator = new Calculator(previousTextElement, currentTextElement);

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
});