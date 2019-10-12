import React from "react";
import logo from "./logo.svg";

import "./App.css";
import DetailedView from "./DetailedView.js";

function Nav() {
  var style = {
    backgroundColor: "red",
    width: "100%",
    height: 40
  };

  return <div style={style}> </div>;
}

function App() {
  return (
    <div className="App">
      <Nav />
      <DetailedView />
    </div>
  );
}

export default App;
