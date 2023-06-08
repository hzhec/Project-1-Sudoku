let selectedNum = "";
let loadedBoard = [];

// Create a 9x9 board
for (let i = 0; i < 81; i++) {
	const square = document.createElement("div");
	let col = i % 9;
	let row = Math.floor(i / 9);
	square.classList.add("square", "row" + row, "col" + col);
	square.setAttribute("row", row);
	square.setAttribute("col", col);

	//
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

// Initialise sudoku board. Generated by sudoku app.
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
	// Clone array to loadedBoard
	return (loadedBoard = [...sudokuBoard[randomIndex]]);
};

const generateSudoku = (array) => {
	const squares = document.querySelectorAll(".square");
	// Generate random number to load the sudoku puzzle randomly
	for (let i = 0; i < 81; i++) {
		let num = array[i];
		squares[i].innerText = "";
		if (num !== 0) {
			if (squares[i].classList.contains("active")) {
				squares[i].classList.remove("active");
			}
			squares[i].innerText = num;
		} else {
			squares[i].classList.add("active");
			squares[i].addEventListener("click", (event) => {
				event.currentTarget.innerText = selectedNum;
			});
		}
	}
};

const newGame = document.querySelector(".new-game");
newGame.addEventListener("click", () => {
	document.querySelector(".text-box").style.display = "flex";
	document.querySelector(".number-box").style.display = "flex";
	generateSudoku(randomBoard());
});

const submitGame = document.querySelector(".submit");
submitGame.addEventListener("click", () => {
	const squares = document.querySelectorAll(".square");
	const array = [];
	squares.forEach((element) => array.push(element.innerText));
	console.log(array);
});

const resetBoard = document.querySelector(".reset-btn");
resetBoard.addEventListener("click", () => {
	generateSudoku(loadedBoard);
});
