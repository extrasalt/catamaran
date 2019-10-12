import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button"
import "./App.css";

function DetailedView(props) {
  var issueId = props.id;
  return (
    <div>
      <div className="card">
        <h3>
          <span> Ticket Info: </span> <span> { issueId } </span>
        </h3>
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
      <ShareOnWhatsapp message="Fire!! Fire!!" />
      <VolunteerCard />
    </div>
  );
}

function ShareOnWhatsapp(props) {
  var whatsappLink = "whatsapp://send?text=" + props.message;
  return <Button href={whatsappLink}> Share on whatsapp </Button>;
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

export default DetailedView;
