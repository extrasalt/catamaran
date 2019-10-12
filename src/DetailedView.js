import React from "react";
import logo from "./logo.svg";
import Button from "@material-ui/core/Button";
import "./App.css";

function DetailedView(props) {
  var issueId = props.id;
  var issueBody = {
    status: "Dispatched",
    type: "Supplies",
    message: "Fire!! Fire!!",
    address: "OMR",
    number: "123"
  };
  return (
    <div>
      <Ticket id={issueId} body={issueBody} />
      <ShareOnWhatsapp message="Fire!! Fire!!" />
      <VolunteerCard />
    </div>
  );
}

function Ticket(props) {
  console.log(props);
  return (
    <div className="card">
      <h3 style={{ display: "inline" }}>1234</h3>{" "}
      <span style={{ float: "right" }}> {props.body.status}</span>
      <div>
        <span> Type: </span> <span> {props.body.type} </span>
      </div>
      <div>
        <span> Message: </span> <span> {props.body.message} </span>
      </div>
      <div>
        <span> Address: </span> <span> {props.body.address} </span>
        <button>Map</button>
      </div>
    </div>
  );
}

function ShareOnWhatsapp(props) {
  var whatsappLink = "whatsapp://send?text=" + props.message;
  return <Button href={whatsappLink}> Share on whatsapp </Button>;
}

function VolunteerCard() {
  return (
    <div className="card">
      <h3>Volunteer Details</h3>
      Volunteer name <br />
      82918391823
    </div>
  );
}

export { DetailedView, Ticket };
