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
