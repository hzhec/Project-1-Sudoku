let selectedNum = "";
let loadedBoard = [];
let boardIndex = "";
let completedBoard = {
	0: [
		8, 9, 4, 6, 2, 7, 3, 5, 1, 5, 2, 7, 8, 1, 3, 4, 6, 9, 1, 6, 3, 5, 9, 4, 2,
		8, 7, 7, 3, 8, 4, 5, 1, 6, 9, 2, 2, 4, 9, 7, 3, 6, 8, 1, 5, 6, 5, 1, 9, 8,
		2, 7, 3, 4, 3, 8, 2, 1, 7, 5, 9, 4, 6, 4, 7, 5, 3, 6, 9, 1, 2, 8, 9, 1, 6,
		2, 4, 8, 5, 7, 3,
	],
	1: [
		3, 7, 8, 4, 1, 5, 2, 6, 9, 5, 6, 1, 9, 2, 8, 4, 7, 3, 4, 2, 9, 7, 6, 3, 5,
		8, 1, 7, 4, 5, 3, 9, 6, 8, 1, 2, 8, 3, 2, 1, 5, 7, 6, 9, 4, 1, 9, 6, 2, 8,
		4, 3, 5, 7, 9, 8, 4, 6, 7, 2, 1, 3, 5, 2, 5, 7, 8, 3, 1, 9, 4, 6, 6, 1, 3,
		5, 4, 9, 7, 2, 8,
	],
};

let minute = 0;
let second = 0;
let myTimer;

const timer = () => {
	// Increment of 1 for second once timer function invoked
	if ((second += 1) == 60) {
		second = 0;
		minute++;
	}
	document.querySelector("#minute").innerText = returnData(minute);
	document.querySelector("#second").innerText = returnData(second);
};

const returnData = (input) => {
	return input > 10 ? input : `0${input}`;
};

const timeStart = () => {
	myTimer = setInterval(() => {
		timer();
	}, 1000);
};

const timePause = () => {
	clearInterval(myTimer);
};

const timeReset = () => {
	minute = 0;
	second = 0;
	document.querySelector("#minute").innerText = "00";
	document.querySelector("#second").innerText = "00";
};

// Taking reference from https://lisperator.net/blog/javascript-sudoku-solver/
// Convert index of a value in an array to row and column
const indexToRowCol = (index) => {
	return { row: Math.floor(index / 9), col: index % 9 };
};

// Convert value with row and column to its index of an array
const rowColToIndex = (row, col) => {
	return row * 9 + col;
};

const checkDuplicates = (array, index, value) => {
	let valuePosition = indexToRowCol(index);
	// console.log(valuePosition);
	let valueToString = value.toString();

	// Check if the number duplicated in the same row
	for (let col = 0; col < 9; col++) {
		if (valuePosition.col !== col) {
			if (array[rowColToIndex(valuePosition.row, col)] === valueToString) {
				return false;
			}
		}
	}

	// Check if the number duplicated in the same col
	for (let row = 0; row < 9; row++) {
		if (valuePosition.row !== row) {
			if (array[rowColToIndex(row, valuePosition.col)] === valueToString) {
				return false;
			}
		}
	}

	// Check if the number duplicated in 3x3 box
	let boxRow = Math.floor(valuePosition.row / 3) * 3;
	let boxCol = Math.floor(valuePosition.col / 3) * 3;
	for (let row = boxRow; row < boxRow + 3; row++) {
		for (let col = boxCol; col < boxCol + 3; col++) {
			if (valuePosition.row !== row && valuePosition.col !== col) {
				if (array[rowColToIndex(row, col)] === valueToString) {
					return false;
				}
			}
		}
	}

	// If no duplicates found, return true.
	return true;
};

const solve = (array) => {
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

// Create a 9x9 board
for (let i = 0; i < 81; i++) {
	const square = document.createElement("div");
	let col = i % 9;
	let row = Math.floor(i / 9);
	square.classList.add("square", "row" + row, "col" + col);
	square.setAttribute("row", row);
	square.setAttribute("col", col);

	// Assign classlist to subgrid (3x3 box)
	if (
		((col === 0 ||
			col === 1 ||
			col === 2 ||
			col === 6 ||
			col === 7 ||
			col === 8) &&
			(row === 0 ||
				row === 1 ||
				row === 2 ||
				row === 6 ||
				row === 7 ||
				row === 8)) ||
		((col === 3 || col === 4 || col === 5) &&
			(row === 3 || row === 4 || row === 5))
	) {
		square.classList.add("odd-box");
	} else {
		square.classList.add("even-box");
	}

	document.querySelector(".game-box").appendChild(square);
}

// Initialise sudoku board. Generated by sudoku iphone game app.
let sudokuBoard = {
	0: [
		8, 9, 4, 0, 0, 0, 0, 5, 1, 0, 0, 7, 0, 0, 3, 0, 6, 9, 0, 6, 0, 5, 0, 4, 0,
		0, 0, 0, 3, 8, 4, 5, 1, 0, 0, 0, 2, 0, 0, 0, 0, 6, 8, 0, 5, 6, 0, 0, 0, 0,
		2, 7, 0, 0, 3, 8, 0, 1, 7, 5, 0, 0, 0, 4, 0, 0, 3, 6, 9, 1, 0, 8, 0, 1, 0,
		0, 0, 0, 5, 7, 0,
	],
	1: [
		3, 7, 8, 4, 1, 0, 2, 0, 0, 5, 6, 0, 0, 0, 8, 0, 0, 0, 0, 0, 0, 7, 6, 0, 0,
		0, 1, 0, 0, 0, 3, 0, 0, 8, 0, 0, 0, 3, 2, 1, 0, 0, 6, 9, 0, 0, 0, 6, 2, 8,
		4, 3, 5, 7, 0, 0, 4, 0, 0, 0, 0, 0, 5, 0, 5, 0, 0, 3, 1, 9, 4, 6, 6, 1, 0,
		0, 0, 0, 7, 0, 8,
	],
};

// Create number 1 - 9 for input purpose
const numberBox = document.querySelectorAll(".number-selector");
let activeBtn = null;
numberBox.forEach((element) =>
	element.addEventListener("click", (event) => {
		const messageBox = document.querySelector(".message-box");
		let num = event.target.innerText;

		event.target.classList.add("selected");
		// console.log(event.target);
		// console.log(event.currentTarget);

		if (num === "Clear") {
			selectedNum = "";
			messageBox.innerText = `Select a box to clear the number`;
		} else {
			messageBox.innerHTML = `Selected number:<br> <span>${num}</span>`;
			selectedNum = num;
			// console.log(num); // string type
			// console.log(typeof event.target.innerText);
		}

		// Reference taken from https://dev.to/oliwier965/multiple-buttons-only-one-active-on-click-50on
		if (activeBtn === null) {
			activeBtn = event.target;
		} else if (activeBtn !== event.target) {
			activeBtn.classList.remove("selected");
			activeBtn = event.target;
		}

		// console.log(activeBtn);
	})
);

const randomBoard = () => {
	const randomIndex = parseInt(
		Math.floor(Math.random() * Object.keys(sudokuBoard).length)
	);
	boardIndex = randomIndex;
	// Clone array to loadedBoard
	return (loadedBoard = [...sudokuBoard[boardIndex]]);
};

const generateSudoku = (array) => {
	const squares = document.querySelectorAll(".square");
	// Generate random number to load the sudoku puzzle randomly
	for (let i = 0; i < 81; i++) {
		let num = array[i];
		squares[i].innerText = "";
		if (squares[i].classList.contains("passed")) {
			squares[i].classList.remove("passed");
		}
		if (num !== 0) {
			if (squares[i].classList.contains("active")) {
				squares[i].classList.remove("active");
			}
			squares[i].innerText = num;
		} else {
			squares[i].classList.add("active");
			squares[i].addEventListener("click", (event) => {
				// if (checkDuplicates(array, i, selectedNum)) {
				// }
				event.currentTarget.innerText = selectedNum;
			});
		}
	}
};

const newGame = document.querySelector(".new-game");
newGame.addEventListener("click", () => {
	timePause();
	timeReset();
	document.querySelector(".pause-time").disabled = false;
	document.querySelector(".game-box").style.display = "grid";
	document.querySelector(".text-box").style.display = "flex";
	document.querySelector(".number-box").style.display = "flex";
	document.querySelector(".start-time").disabled = true;
	document.querySelector(".submit-btn").disabled = false;
	document.querySelector(".reset-btn").disabled = false;
	document.querySelector(".complete-btn").disabled = false;
	generateSudoku(randomBoard());
	timeStart();
});

const submitGame = document.querySelector(".submit");
submitGame.addEventListener("click", () => {
	const squares = document.querySelectorAll(".square");
	const array = [];
	squares.forEach((element) => {
		array.push(element.innerText);
	});
	if (solve(array)) {
		timePause();
		document.querySelector(".pause-time").disabled = true;
		document.querySelector(".start-time").disabled = true;
		document.querySelector(".reset-btn").disabled = true;
	}
});

const resetBoard = document.querySelector(".reset-btn");
resetBoard.addEventListener("click", () => {
	timePause();
	timeStart();
	generateSudoku(loadedBoard);
});

const completeBoard = document.querySelector(".complete-btn");
completeBoard.addEventListener("click", () => {
	const squares = document.querySelectorAll(".square");
	for (let i = 0; i < 81; i++) {
		if (squares[i].innerText === "") {
			// console.log(squares[i].innerText);
			squares[i].innerText = completedBoard[boardIndex][i];
		}
	}
});

const startTime = document.querySelector(".start-time");
startTime.addEventListener("click", () => {
	timeStart();
	document.querySelector(".game-box").style.display = "grid";
	document.querySelector(".number-box").style.display = "flex";
	document.querySelector(".text-box").style.display = "flex";
	document.querySelector(".pause-time").disabled = false;
	document.querySelector(".start-time").disabled = true;
	document.querySelector(".submit-btn").disabled = false;
	document.querySelector(".reset-btn").disabled = false;
	document.querySelector(".complete-btn").disabled = false;
});

const pauseTime = document.querySelector(".pause-time");
pauseTime.addEventListener("click", () => {
	timePause();
	document.querySelector(".game-box").style.display = "none";
	document.querySelector(".number-box").style.display = "none";
	document.querySelector(".text-box").style.display = "none";
	document.querySelector(".pause-time").disabled = true;
	document.querySelector(".start-time").disabled = false;
	document.querySelector(".submit-btn").disabled = true;
	document.querySelector(".reset-btn").disabled = true;
	document.querySelector(".complete-btn").disabled = true;
});
