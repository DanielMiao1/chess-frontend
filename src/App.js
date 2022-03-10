import {Navigation, MenuTitle} from './menubar';
import './App.sass';

function App() {
  document.body.dataset.theme = "light";
  return (
    <div className="main-wrapper">
      <MenuTitle></MenuTitle>
      <Navigation></Navigation>
    </div>
  );
};

export default App;
