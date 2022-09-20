function poll(id, game) {
	let request = new XMLHttpRequest();
	request.open("POST", validation_url + "/api/status/" + id, true);
	request.setRequestHeader("Content-Type", "text/plain");
	request.onreadystatechange = function() {
		if (request.readyState == XMLHttpRequest.DONE && request.status < 400) {
			let response = JSON.parse(request.responseText)
			if (!game.element.dataset.turn || !game.element.dataset.moves) {
				game.element.dataset.turn = response.turn;
			} else if (game.element.dataset.turn == response.turn) {
				return;
			};
			game.element.dataset.moves = JSON.stringify(response.moves);
			game.element.dataset.turn = response.turn;
			game.reconstructPieces(response.board);
		};
	};
	request.send("{}");
};

function startPolling(id, game) {
	poll(id, game);
	setInterval(function() {
		poll(id, game);
	}, 1000);
};
