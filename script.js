// Global variables
// Use [] to select dataset itself (not its value)
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals');
const deleteButton = document.querySelector('[data-delete');
const allClearButton = document.querySelector('[data-all-clear');
const previousTextElement = document.querySelector('[data-previous');
const currentTextElement = document.querySelector('[data-current');

// Creating a class that runs the calculator
class Calculator {
	constructor(previousTextElement, currentTextElement) {
		this.previousTextElement = previousTextElement;
		this.currentTextElement = currentTextElement;
		// .clear() method removes all elements from a object
		this.clear();
	}

	// Clears the display and resets the operator
	clear() {
		this.currentNumber = '';
		this.previousNumber = '';
		this.operator = undefined;
	}

	// Removes the last digit of the current number each time the function delete() is called
	delete() {
		// .toString() transforms the number in a string. This enables to cut the last digit using .slice().
		// .slice(0, -1) selects the first number (index: 0) and the first number before the last one (index: last - 1). Then store this new number in this.currentNumber.
		this.currentNumber = this.currentNumber.toString().slice(0, -1);
	}

	// Adds a number to the display
	appendNumber(number) {
		// If it already exists a '.' (decimal) then returns and doesn't add another '.'
		if(number === '.' && this.currentNumber.includes('.')) return;
		// Converts the currentNumber to string before appending the new number to avoid summing the new number to the currentNumber
		this.currentNumber = this.currentNumber.toString() + number.toString();
	}

	// Chooses the operator for computing
	chooseOperation(operator) {
		// If the currentNumber is empty when the operator is chosen, does nothing
		if(this.currentNumber === '') return;
		// If the previousNumber is not empty, computes the previousNumber with the currentNumber
		if(this.previousNumber !== '') {
			this.compute();
		}
		this.operator = operator;
		// After the computing, passes the value of currentNumber to previousNumber
		this.previousNumber = this.currentNumber;
		// Then resets the value of currentNumber
		this.currentNumber = '';
	}

	// Computes the numbers
	compute() {
		// Declare a variable to store the result of the computation
		let computation;
		// parseFloat converts strings to numbers
		const prev = parseFloat(this.previousNumber);
		const current = parseFloat(this.currentNumber);
		
		// If the previousNumber or currentNumber is not a number, does nothing
		if(isNaN(prev) || isNaN(current)) return;

		// Computes the numbers according to the chosen operator
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

		// Updates the currentNumber with the result of the computation
		this.currentNumber = computation;
		// Resets the operator and previousNumber
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

	// Update the number in the display each time a button is clicked
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