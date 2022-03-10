import "./switches.sass";

function toggleSelected(event) {
  if (!event.target.classList.contains("selected")) {
    for (let x of event.target.parentNode.children) {
      if (x.classList.contains("selected")) {
        x.classList.remove("selected");
      };
    };
    event.target.classList.add("selected");
  };
};

function Radio1(props) {
  return (
    <div className="radio1">
      {
        props.values.map(function(i) {
          return (
            <button key={props.values.indexOf(i)} onClick={toggleSelected} className={props.values.indexOf(i) === 0 ? "selected" : ""} onMouseUp={function(event) { return (event.button === 0 ? (!event.target.classList.contains("selected") ? props.onselect(i) : null) : null) }}>{i}</button>
          );
        })
      }
    </div>
  );
};

export { Radio1 };
