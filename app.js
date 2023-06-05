// Create a 9x9 board
for (let i = 0; i < 81; i++) {
	const square = document.createElement("div");
	square.classList.add("square");
	square.setAttribute("id", i);
	document.querySelector(".game-box").appendChild(square);
}
