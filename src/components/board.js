import React from "react";
import ReactDOM from "react-dom";
import "./board.sass";

let chess = require("chess.js");

class Bullet extends React.Component {
  state = {
    show: true
  };

  render() {
    return this.state.show ? <div className="bullet" onClick={this.props.makeMove.bind(this)} data-move={this.props.x.san} data-to={this.props.x.to}/> : null;
  };
}

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
            for (let z in y) {
              if (z.startsWith("__reactFiber$")) {
                y[z]._debugOwner.stateNode.setState(function() { return {show: false} });
                break;
              };
            };
            break;
          };
        };
      };
    };
  };
};

class Piece extends React.Component {
  state = {
    show: true
  };

  render() {
    if (!this.props.coordinate) {
      return this.state.show ? <div className={"piece " + (this.props.game.get(["a", "b", "c", "d", "e", "f", "g", "h"][this.props.y] + Math.abs(this.props.x - 8).toString()).color + this.props.game.get(["a", "b", "c", "d", "e", "f", "g", "h"][this.props.y] + Math.abs(this.props.x - 8).toString()).type)} onMouseDown={this.click.bind(this)}></div> : null;
    } else {
      return this.state.show ? <div className={"piece " + (this.props.game.get(this.props.coordinate).color + this.props.game.get(this.props.coordinate).type)} onMouseDown={this.click.bind(this)}></div> : null;
    };
  };

  click() {
    if (ReactDOM.findDOMNode(this).classList.contains("selected")) {
      ReactDOM.findDOMNode(this).classList.remove("selected")
      for (let x of document.getElementsByClassName("square")) {
        for (let y of x.children) {
          if (y.classList.contains("bullet")) {
            ReactDOM.unmountComponentAtNode(x);
            for (let z in y) {
              if (z.startsWith("__reactFiber$")) {
                y[z]._debugOwner.stateNode.setState(function() { return {show: false} });
                break;
              };
            };
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
            for (let z in x) {
              if (z.startsWith("__reactFiber$")) {
                y[z]._debugOwner.stateNode.setState(function() { return {show: false} });
                break;
              };
            };
            break;
          };
        };
      };
      ReactDOM.findDOMNode(this).classList.add("selected");
      for (let x of this.props.game.moves({square: ReactDOM.findDOMNode(this).parentNode.id, verbose: true})) {
        console.log(document.getElementById(x.to));
        ReactDOM.render(<Bullet x={x} makeMove={this.makeMove.bind(this)}/>, document.getElementById(x.to))
      }
    };
    this.selected = !this.selected;
  };

  makeMove(event) {
    this.props.game.move(event.target.dataset.move);
    for (let x of document.getElementsByClassName("bullet")) {
      ReactDOM.unmountComponentAtNode(x);
      for (let y in x) {
        if (y.startsWith("__reactFiber$")) {
          x[y]._debugOwner.stateNode.setState(function() { return {show: false} });
          break;
        };
      };
    };
    this.setState(function() { return {show: false} });
    ReactDOM.render(
      <Piece game={this.props.game} coordinate={event.target.dataset.to}/>,
      document.getElementById(event.target.dataset.to)
    );
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
            (function() { return game.get(["a", "b", "c", "d", "e", "f", "g", "h"][y] + Math.abs(x - 8).toString()) ? <Piece game={game} x={x} y={y} coordinate={0}/> : null })()
          }
        </Square>
      );
    };
  };

  return <div id="board">{squares}</div>;
};
