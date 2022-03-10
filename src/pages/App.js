import { Navigation } from '../menubar';
import './App.sass';

function Main() {
  return (
    <div className="main-wrapper">
      <Navigation/>
      <h1 id="title">Chess</h1>
    </div>
  );
};

export default Main;
