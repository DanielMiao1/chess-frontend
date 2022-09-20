const validation_url = "https://validation.multiplayer-chess.gq";
// const validation_url = "http://localhost:34874";

function newComputerGame() {
  let request = new XMLHttpRequest();
  request.open("POST", validation_url + "/game", true);
  request.setRequestHeader("Content-Type", "text/plain");
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      document.location = "/game.html?id=" + request.responseText;
    };
  };
  request.send(JSON.stringify({"type": 0}));
};