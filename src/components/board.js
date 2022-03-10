import React from "react";
import ReactDOM from "react-dom";
import "./board.sass";

let chess = require("chess.js");

class Square extends React.Component {
  render() {
    return <div className={"square " + ((this.props.x + this.props.y & 1) === 0 ? "light" : "dark")} id={["a", "b", "c", "d", "e", "f", "g", "h"][this.props.y] + Math.abs(this.props.x - 8).toString()} onMouseDown={this.click.bind(this)}>{this.props.children}</div>
  };

  click(event) {
    if (document.elementFromPoint(event.clientX, event.clientY).classList.contains("square")) {
      for (let x of document.querySelectorAll(".piece.selected")) {
        x.classList.remove("selected")
      };
      for (let x of document.getElementsByClassName("square")) {
        for (let y of x.children) {
          if (y.classList.contains("bullet")) {
            ReactDOM.unmountComponentAtNode(x);
            break;
          };
        };
      };
    };
  };
};

class Piece extends React.Component {
  render() {
    return <div className={"piece " + (this.props.game.get(["a", "b", "c", "d", "e", "f", "g", "h"][this.props.y] + Math.abs(this.props.x - 8).toString()).color + this.props.game.get(["a", "b", "c", "d", "e", "f", "g", "h"][this.props.y] + Math.abs(this.props.x - 8).toString()).type)} onMouseDown={this.click.bind(this)}></div>;
  };

  click() {
    if (ReactDOM.findDOMNode(this).classList.contains("selected")) {
      ReactDOM.findDOMNode(this).classList.remove("selected")
      for (let x of document.getElementsByClassName("square")) {
        for (let y of x.children) {
          if (y.classList.contains("bullet")) {
            ReactDOM.unmountComponentAtNode(x);
            break;
          };
        };
      };
    } else {
      for (let x of document.querySelectorAll(".piece.selected")) {
        x.classList.remove("selected")
      };
      for (let x of document.getElementsByClassName("square")) {
        for (let y of x.children) {
          if (y.classList.contains("bullet")) {
            ReactDOM.unmountComponentAtNode(x);
            break;
          };
        };
      };
      ReactDOM.findDOMNode(this).classList.add("selected");
      for (let x of this.props.game.moves({square: ReactDOM.findDOMNode(this).parentNode.id, verbose: true})) {
        ReactDOM.render(<div className="bullet" onClick={this.makeMove.bind(this)} data-move={x.san} data-to={x.to}/>, document.getElementById(x.to))
      }
    };
    this.selected = !this.selected;
  };

  makeMove(event) {
    this.props.game.move(event.target.dataset.move);
    // for (let x of document.getElementsByClassName("square")) {
    //   for (let y of x.children) {
    //     if (y.classList.contains("bullet")) {
    //       ReactDOM.unmountComponentAtNode(x);
    //       break;
    //     };
    //   };
    // };
    ReactDOM.findDOMNode(this).classList.remove("selected");
    this.parentNode.removeChild(this);
    this.appendChild(document.getElementById(event.target.dataset.to));
  };
};

export default function Chessboard() {
  let game = chess();
  let squares = [];
  for (let x of Array(8).fill().map(function(_, index) { return index })) {
    for (let y of Array(8).fill().map(function(_, index) { return index })) {
      squares.push(
        <Square x={x} y={y} key={squares.length}>
          {
            (function() { return game.get(["a", "b", "c", "d", "e", "f", "g", "h"][y] + Math.abs(x - 8).toString()) ? <Piece game={game} x={x} y={y}/> : null })()
          }
        </Square>
      );
    };
  };

  return <div id="board">{squares}</div>;
};
