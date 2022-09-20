function startPolling(id, game) {
	let request;
	setInterval(function() {
		request = new XMLHttpRequest();
		request.open("POST", validation_url + "/api/status/" + id, true);
		request.setRequestHeader("Content-Type", "text/plain");
		request.onreadystatechange = function() {
			if (request.readyState == XMLHttpRequest.DONE && request.status < 400) {
				let response = JSON.parse(request.responseText)
				game.reconstructPieces(response.board)
			};
		};
		request.send("{}");
	}, 1000);
};
