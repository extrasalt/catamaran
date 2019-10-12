import React from "react";
import Kanban from "./Kanban.js";
import Container from "@material-ui/core/Container";

function BoardView() {
  var style = {
    width: "100%",
    margin: "auto",
    height: 40,
    marginLeft: 30,
    marginBottom: 20
  };

  //   var pageStyle = {
  //     display: "flex",
  //     alignItems: "center",
  //     justifyContent: "center"
  //   };

  return (
    <Container maxWidth="lg">
      <h1>Tickets</h1>
      <input type="textbox" style={style} />
      <Kanban />
    </Container>
  );
}

export default BoardView;
