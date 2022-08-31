function board(element) {
	let board = document.createElement("div");
	board.classList.add("board");
	element.appendChild(board);
	element = board;
	let squares = document.createElement("div");
	squares.classList.add("squares");
	element.appendChild(squares);
	let square = undefined, square_index = 0;
	while (true) {
		if (square_index == 64) {
			break;
		};
		square = document.createElement("div");
		square.classList.add("square");
		square.classList.add((((Math.floor(square_index / 8) + (square_index % 8)) & 1) == 0) ? "light" : "dark");
		squares.appendChild(square);
		square_index++;
	};

	let pieces = document.createElement("div");
	pieces.classList.add("pieces");
	element.appendChild(pieces);
};
