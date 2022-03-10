import './menubar.sass';

function Navigation() {
  let pages = [["Homepage", "/"], ["New Game", "/"], ["Legacy Chess", ["http://legacy.chess.rf.gd/"]]];
  return (
    <div className="nav">
      {
        pages.map(function(i) {
          return (
            <a href={i[1]} key={pages.indexOf(i)}>
              {i[0]}
              <div className="hover" style={{}}></div>
            </a>
          );
        })
      }
    </div>
  );
};

function MenuTitle() {
  return <h1 id="title">Chess</h1>
}

export {Navigation, MenuTitle};
