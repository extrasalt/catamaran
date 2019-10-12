import React from "react";
import logo from "./logo.svg";

import "./App.css";

function DetailedView() {
  return (
    <div>
      <Ticket />
      <ShareOnWhatsapp message="Fire!! Fire!!" />
      <VolunteerCard />
    </div>
  );
}

function Ticket() {
  return (
    <div className="card">
      <h3>Ticket Info</h3>
      <div>
        <span> Status: </span> <span> Dispatched</span>
      </div>
      <div>
        <span> Type: </span> <span> Supplies </span>
      </div>
      <div>
        <span> Message: </span> <span> Fire!! Fire!! </span>
      </div>
      <div>
        <span> Address: </span> <span> OMR perungudi </span>
        <button>Map</button>
      </div>

      <div>
        <span> Number: </span> <span> 1234</span>
      </div>
    </div>
  );
}

function ShareOnWhatsapp(props) {
  var whatsappLink = "whatsapp://send?text=" + props.message;
  return <a href={whatsappLink}> Share on whatsapp </a>;
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

export { DetailedView, Ticket };
