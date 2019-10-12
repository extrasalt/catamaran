import React from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import Header from "./Header";
import { Container } from "@material-ui/core";

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
      <Header></Header>
      <Container maxWidth="sm" style={{ marginTop: 40 }}>
        <Ticket id={issueId} body={issueBody} />
        <ShareOnWhatsapp message="Fire!! Fire!!" />
        <VolunteerCard />
      </Container>
    </div>
  );
}

function Ticket(props) {
  var styles = {
    padding: 5,
    paddingLeft: 10
  };

  var statusColor = {
    padding: 3,
    backgroundColor: "#eee",
    float: "right"
  };
  return (
    <div style={styles}>
      <span style={{ display: "inline" }}>1234</span>
      <span style={statusColor}> {props.body.status}</span>
      <div>
        <span> Type: </span> <span> {props.body.type} </span>
      </div>
      {/* //TODO: LIMIT height */}
      <div>{props.body.message}</div>
      <div>
        <span> Address: </span> <span> {props.body.address} </span>
        {/* //TODO: Add font awesome */}
        <Button>&</Button>
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
    <div>
      <h3>Volunteer Details</h3>
      Volunteer name <br />
      82918391823
    </div>
  );
}

export { DetailedView, Ticket };
