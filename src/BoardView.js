import React from "react";
import Kanban from "./Kanban.js";

function BoardView() {
  var style = {
    width: "80%",
    margin: "auto",
    height: 40,
    marginLeft: 30,
    marginBottom: 20
  };

  return (
    <div>
      <h1>Tickets</h1>
      <input type="textbox" style={style} />
      <Kanban />
    </div>
  );
}

export default BoardView;
