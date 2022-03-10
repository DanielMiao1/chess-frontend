import { Navigation } from "../menubar";
import Chessboard from "../components/board"

import "../base.sass";

export default function Game() {
  return (
    <div className="main-wrapper">
      <Navigation/>
      <br/><br/><br/>
      <Chessboard/>
    </div>
  );
};
