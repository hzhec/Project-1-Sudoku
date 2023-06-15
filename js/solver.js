////////////////////////////
/// Check & Solve Puzzle ///
////////////////////////////

// Taking reference from https://lisperator.net/blog/javascript-sudoku-solver/
// Convert index of a value in an array to row and column
export const indexToRowCol = (index) => {
	return { row: Math.floor(index / 9), col: index % 9 };
};

// Convert value with row and column to its index of an array
export const rowColToIndex = (row, col) => {
	return row * 9 + col;
};

// Function to check for duplicate value along row/col/subgrid
export const checkDuplicates = (array, index, value) => {
	let valuePosition = indexToRowCol(index);
	// console.log(valuePosition);
	let dupPassed = true;

	if (value === NaN) {
		value = 0;
	}
	// Check if the number duplicated in the same row
	for (let col = 0; col < 9; col++) {
		if (valuePosition.col !== col) {
			if (
				array[rowColToIndex(valuePosition.row, col)] === value &&
				value !== 0
			) {
				document
					.querySelector(`[row="${valuePosition.row}"][col="${col}"]`)
					.classList.add("duplicate");
				dupPassed = false;
				// return false;
			} else {
				document
					.querySelector(`[row="${valuePosition.row}"][col="${col}"]`)
					.classList.remove("duplicate");
			}
		}
	}

	// Check if the number duplicated in the same col
	for (let row = 0; row < 9; row++) {
		if (valuePosition.row !== row) {
			if (
				array[rowColToIndex(row, valuePosition.col)] === value &&
				value !== 0
			) {
				document
					.querySelector(`[row="${row}"][col="${valuePosition.col}"]`)
					.classList.add("duplicate");
				dupPassed = false;
				// return false;
			} else {
				document
					.querySelector(`[row="${row}"][col="${valuePosition.col}"]`)
					.classList.remove("duplicate");
			}
		}
	}

	// Check if the number duplicated in 3x3 box (subgrid)
	let boxRow = Math.floor(valuePosition.row / 3) * 3;
	let boxCol = Math.floor(valuePosition.col / 3) * 3;
	for (let row = boxRow; row < boxRow + 3; row++) {
		for (let col = boxCol; col < boxCol + 3; col++) {
			if (valuePosition.row !== row && valuePosition.col !== col) {
				if (array[rowColToIndex(row, col)] === value && value !== 0) {
					document
						.querySelector(`[row="${row}"][col="${col}"]`)
						.classList.add("duplicate");
					dupPassed = false;
					// return false;
				} else {
					document
						.querySelector(`[row="${row}"][col="${col}"]`)
						.classList.remove("duplicate");
				}
			}
		}
	}

	// If no duplicates found, return true.
	return dupPassed;
};

// Function to solve the sudoku puzzle
export const solve = (array) => {
	const squares = document.querySelectorAll(".square");
	let completeStatus = true;
	for (let i = 0; i < 81; i++) {
		let value = array[i];
		if (value !== "") {
			if (checkDuplicates(array, i, value)) {
				if (squares[i].classList.contains("active")) {
					squares[i].classList.add("passed");
				}
			} else if (squares[i].classList.contains("active")) {
				if (squares[i].classList.contains("passed")) {
					squares[i].classList.remove("passed");
				}
				squares[i].innerText = "";
				completeStatus = false;
			}
		} else {
			completeStatus = false;
		}
	}
	return completeStatus;
};
