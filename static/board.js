function removeBullets(bullets_element) {
	while (bullets_element.lastChild) {
		bullets_element.removeChild(bullets_element.lastChild);
	};

	for (let x of document.getElementsByClassName("square")) {
		if (x.classList.contains("active")) {
			x.classList.remove("active");
		};
		if (x.classList.contains("bullet-active")) {
			x.classList.remove("bullet-active");
		};
	};
};

function addBulletListeners(bullet, game) {
	bullet.addEventListener("mouseover", function() {
		game.squares[bullet.dataset.square].classList.add("bullet-active");
	});

	bullet.addEventListener("mouseout", function() {
		for (let x of document.getElementsByClassName("square")) {
			if (x.classList.contains("bullet-active")) {
				x.classList.remove("bullet-active");
			};
		};
	});

	bullet.addEventListener("mousedown", function() {
		let id = new Proxy(new URLSearchParams(window.location.search), {
			get: (searchParams, prop) => searchParams.get(prop)
		}).id.toString();
		let request = new XMLHttpRequest();
		request.open("POST", validation_url + "/api/move/" + id, true);
		request.onreadystatechange = function() {
			if (request.readyState == request.DONE) {
				game.poll_function(id, game);
			};
		};
		request.setRequestHeader("Content-Type", "text/plain");
		request.send(JSON.stringify({"move": this.dataset.move}));
		for (let x of document.getElementsByClassName("piece")) {
			if (x.dataset.square == this.dataset.from) {
				x.style.left = game.squares[this.dataset.square].offsetLeft + "px";
				x.style.top = game.squares[this.dataset.square].offsetTop + "px";
			};
		};
		removeBullets(this.parentNode);
	});
};

function addPieceListeners(piece, game) {
	piece.addEventListener("mousedown", function() {
		let bullets_container = this.parentNode.parentNode.getElementsByClassName("bullets")[0];
		if (game.squares[this.dataset.square].classList.contains("active")) {
			removeBullets(bullets_container);
			return;
		};
		let bullet;
		removeBullets(bullets_container);
		game.squares[this.dataset.square].classList.add("active")
		for (let x of JSON.parse(this.parentNode.parentNode.dataset.moves)) {
			if (x.from == this.dataset.square) {
				bullet = document.createElement("div");
				bullet.classList.add("bullet");
				bullet.style.left = game.squares[x.to].offsetLeft + "px";
				bullet.style.top = game.squares[x.to].offsetTop + "px";
				bullet.dataset.square = x.to;
				bullet.dataset.from = x.from;
				bullet.dataset.move = x.san;
				addBulletListeners(bullet, game);
				bullets_container.appendChild(bullet);
			};
		};
	});
};

function board(element, poll_function) {
	let board = document.createElement("div");
	board.classList.add("board");
	element.appendChild(board);
	element = board;
	let squares_element = document.createElement("div");
	squares_element.classList.add("squares");
	element.appendChild(squares_element);
	let square = undefined, square_index = 0;
	let index_to_file = ["a", "b", "c", "d", "e", "f", "g", "h"];
	let squares = {};
	while (true) {
		if (square_index == 64) {
			break;
		};
		square = document.createElement("div");
		square.classList.add("square");
		square.classList.add((((Math.floor(square_index / 8) + (square_index % 8)) & 1) == 0) ? "light" : "dark");
		square.dataset.index = index_to_file[square_index % 8] + (8 - Math.floor(square_index / 8)).toString();
		square.addEventListener("click", function() {
			removeBullets(this.parentNode.parentNode.getElementsByClassName("bullets")[0]);
		});
		squares_element.appendChild(square);
		square_index++;
		squares[square.dataset.index] = square;
	};

	let pieces = document.createElement("div");
	pieces.classList.add("pieces");
	element.appendChild(pieces);
	let bullets = document.createElement("div");
	bullets.classList.add("bullets");
	element.appendChild(bullets);
	return {
		element: element,
		squares: squares,
		poll_function: poll_function,
		reconstructPieces: function(pieces) {
			let pieces_element = document.getElementsByClassName("pieces")[0];
			while (pieces_element.lastChild) {
				pieces_element.removeChild(pieces_element.lastChild);
			};
			let piece;
			for (let x of pieces) {
				for (let y of x) {
					if (y == null) {
						continue;
					};
					piece = document.createElement("div");
					piece.classList.add("piece");
					piece.classList.add("_" + y.color);
					piece.classList.add(y.type);
					piece.dataset.square = y.square;
					addPieceListeners(piece, this);
					pieces_element.appendChild(piece);
					piece.style.left = this.squares[y.square].offsetLeft + "px";
					piece.style.top = this.squares[y.square].offsetTop + "px";
				};
			};
			removeBullets(this.element.getElementsByClassName("bullets")[0]);
		},
	};
};
