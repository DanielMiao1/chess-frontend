const validation_url = "https://validation.multiplayer-chess.gq";
// const validation_url = "http://localhost:34874";

function newComputerGame() {
  let request = new XMLHttpRequest();
  request.open("POST", validation_url + "/game", true);
  request.setRequestHeader("Content-Type", "text/plain");
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      let response = JSON.parse(request.responseText);
      localStorage.auth_key = response["auth_key"];
      document.location = "/game.html?id=" + response["id"];
    };
  };
  request.send(JSON.stringify({"type": 0}));
};

function newTwoPlayerGame() {
  let request = new XMLHttpRequest();
  request.open("POST", validation_url + "/game", true);
  request.setRequestHeader("Content-Type", "text/plain");
  request.onreadystatechange = function() {
    if (request.readyState == XMLHttpRequest.DONE) {
      let response = JSON.parse(request.responseText);
      let id = response["id"]
      let popup = document.createElement("div");
      popup.classList.add("popup");
      document.body.appendChild(popup);
      let popup_text = document.createElement("p");
      popup_text.classList.add("popup-text")
      popup.appendChild(popup_text);
      let popup_link = document.createElement("p");
      popup_link.innerHTML = `URL: https://www.multiplayer-chess.gq/game.html?id=${id}` // TODO: Change innerHTML
      popup.appendChild(popup_link);

      localStorage.auth_key = response["auth_key"]

      setInterval(function() {
        let request = new XMLHttpRequest();
        request.open("POST", validation_url + "/api/join_status/" + id, true);
        request.setRequestHeader("Content-Type", "text/plain");
        request.onreadystatechange = function() {
          if (request.readyState == XMLHttpRequest.DONE && request.status < 400) {
            if (JSON.parse(request.responseText) == true) {
              document.location = "/game.html?id=" + id;
            };
          };
        };
        request.send("{}");
      }, 2000)
    };
  };
  request.send(JSON.stringify({"type": 1}));
};
