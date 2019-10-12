import React, { useState } from "react";
import Kanban from "./Kanban.js";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";

const CssTextField = withStyles({
  root: {
    "& label.Mui-focused": {
      color: "green"
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "green"
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#ef4056"
      },
      "&:hover fieldset": {
        borderColor: "green"
      },
      "&.Mui-focused fieldset": {
        borderColor: "green"
      }
    }
  }
})(TextField);

function BoardView() {
  const [searchInput, setSearchInput] = useState("Search");

  const handleChange = event => {
    setSearchInput(event.target.value);
  };

  return (
    <Container maxWidth="lg">
      <h1>Tickets</h1>
      <CssTextField
        id="standard-full-width"
        style={{ margin: 8 }}
        placeholder="Search"
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true
        }}
        onChange={handleChange}
        variant="outlined"
      />
      <Kanban data={searchInput} />
    </Container>
  );
}

export default BoardView;
