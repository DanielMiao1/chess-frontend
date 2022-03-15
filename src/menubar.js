import './menubar.sass';
import { Link } from "react-router-dom";

function Navigation() {
  // let pages = [["Homepage", "/"], ["New Game", "/create"], ["Legacy Chess", "http://legacy.chess.rf.gd/"]];
  return (
    <div className="nav">
      <ul>
        <Link to="/">
          <li style={{fontFamily: "'Smooch Sans', sans-serif", fontSize: "20px", fontWeight: "600"}}>
            Chess
            <div className="hover" style={{}}></div>
          </li>
        </Link>
        <Link to="/create">
          <li>
            New Game
            <div className="hover" style={{}}></div>
          </li>
        </Link>
        <a href="http://legacy.chess.rf.gd">
          <li>
            Legacy Chess
            <div className="hover" style={{}}></div>
          </li>
        </a>
      </ul>
    </div>
  );
};

export default Navigation;
