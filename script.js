// Global variables
// Use [] to select data-* itself (not its value)
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
		// .clear() method removes all elements from the object
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
		// .toString() transforms the number to string. This enables to cut the last digit using .slice().
		// .slice(0, -1) selects the first number (index: 0) and the second-to-last number (index: last - 1). Then store this new number in "this.currentNumber".
		this.currentNumber = this.currentNumber.toString().slice(0, -1);
	}

	// Adds a number to the display when the button is clicked. The parameter (number) refers to the button's number value that is taken by event listener.
	appendNumber(number) {
		// If it already exists a '.' (decimal) then returns and doesn't add another '.'
		if(number === '.' && this.currentNumber.includes('.')) return;
		// Converts the "currentNumber" to string before appending the new number to avoid adding it to the "currentNumber"
		this.currentNumber = this.currentNumber.toString() + number.toString();
	}

	// Chooses the operator for computing
	chooseOperation(operator) {
		// If the "currentNumber" is empty when the operator is chosen, does nothing
		if(this.currentNumber === '') return;
		// If the "previousNumber" is not empty, computes the "previousNumber" with the "currentNumber"
		if(this.previousNumber !== '') {
			this.compute();
		}
		this.operator = operator;
		// After the computing, passes the value of "currentNumber" to "previousNumber"
		this.previousNumber = this.currentNumber;
		// Then resets the value of "currentNumber"
		this.currentNumber = '';
	}

	// Computes the numbers
	compute() {
		// Declares a variable to store the result of the computation
		let computation;
		// parseFloat() accepts the string and converts it into a floating-point number
		const prev = parseFloat(this.previousNumber);
		const current = parseFloat(this.currentNumber);
		
		// If the "previousNumber" or "currentNumber" is not a number (isNaN), does nothing
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

		// Updates the "currentNumber" value with the result of the computation
		this.currentNumber = computation;
		// Resets the operator and "previousNumber"
		this.operator = undefined;
		this.previousNumber = '';
	}

	getDisplayNumber(number) {
		// Converts the number to string
		const stringNumber = number.toString();
		// "stringNumber.split('.')[0]" splits the number in two elements (one before and one after "."), takes the first one and then stores as a number using parseFlot()
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		// Splits the number in two elements (before and after ".") and stores the second (after ".")
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		// If the "integerDigits" is not a number, sets as empty
		if(isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			// ".toLocaleString()" formats the number according to the language selected (in this case, "en"/english - example: 1,000 instead of 1000)
			// "maximumFractionDigits" option ignores any number after "." (decimal)
			integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
		};
		if(decimalDigits != null) {
			// If the number has decimals, concatenates "integerDisplay" and "decimalDigits"
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	// Updates the number in the display each time the button is clicked
	updateDisplay() {
		// Runs the getDisplayNumber() and updates the currentTextElement accordingly (example: 1000 changes to 1,000)
		this.currentTextElement.innerText = this.getDisplayNumber(this.currentNumber);
		// If an operator is chosen after a number, passes this number to previousNumber with the chosen operator after it (example: 13 *)
		this.operator != null ? this.previousTextElement.innerText = `${this.getDisplayNumber(this.previousNumber)} ${this.operator}` : this.previousTextElement.innerText = this.previousNumber;
	}
};

// Creates a new instance in Calculator class with previous and current numbers as its parameters
const calculator = new Calculator(previousTextElement, currentTextElement);


// Add Event Listeners

// Iterates each number button
numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Calls appendNumber() with the respective button's value (number) as a parameter
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});

// Iterates each operator button
operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		// Calls chooseOperation() with the respective button's value (operator) as a parameter
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