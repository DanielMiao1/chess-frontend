import { Radio1 } from "../components/switches";

import "../base.sass";

export default function NewGame() {
  return (
    <div className="main-wrapper">
      <h1 id="title-small">New Game</h1>
      <br/>
      <Radio1 values={["Play with the computer", "2 Players"]} onselect={function(new_value) { }}/>
      <br/>
      <button className="button button-large" onClick={function() { document.location = "#/game/1" }}>Start Game</button>
    </div>
  );
};
