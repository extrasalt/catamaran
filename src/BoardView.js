import React, { useState } from "react";
import Kanban from "./Kanban.js";
<<<<<<< Updated upstream
import Container from "@material-ui/core/Container";
=======
import TextField from "@material-ui/core/TextField";
>>>>>>> Stashed changes

function BoardView() {
  var style = {
    width: "100%",
    margin: "auto",
    height: 40,
    marginLeft: 30,
    marginBottom: 20
  };


  const [searchInput, setSearchInput] = useState('Search');

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <h1>Tickets</h1>
      <TextField
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="Search"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
        onChange={handleChange}
      />
      <Kanban data={searchInput}/>
    </Container>
  );
}

export default BoardView;
