import React from "react";
import logo from "./logo.svg";

import "./App.css";

function DetailedView() {
  return (
    <div>
      <div className="card">
        <h3>Ticket Info</h3>
        <div>
          <span> Status: </span> <span> Dispatched </span>
        </div>
        <div>
          <span> Type: </span> <span> Supplies </span>
        </div>
        <div>
          <span> Message: </span> <span> Fire!! Fire!! </span>
        </div>
        <div>
          <span> Address: </span> <span> OMR perungudi </span>
        </div>
        <div>
          <span> Number: </span> <span> 1234</span>
        </div>
      </div>
      <VolunteerCard />
    </div>
  );
}

function VolunteerCard() {
  return (
    <div class="card">
      <h3>Volunteer Details</h3>
      Volunteer name <br />
      82918391823
    </div>
  );
}

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
