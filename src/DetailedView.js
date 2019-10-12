import React from "react";
import Button from "@material-ui/core/Button";
import "./App.css";
import Header from "./Header";
import { Container, Badge } from "@material-ui/core";
import { blockParams } from "handlebars";

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
  console.log(props);
  var styles = {
    padding: 5,
    paddingLeft: 10
  };

  var statusColor = {
    padding: 3,
    backgroundColor: "#eee",
    float: "right"
  };

  var messageBubble = {
    display: "block",
    backgroundColor: "#f0f0ff",
    margin: 5,
    padding: 3,
    borderRadius: 5
  };
  return (
    <div style={styles}>
      <Badge badgeContent={props.body.type} color="primary">
        <div>{props.body.number}</div>

        {/* <span style={statusColor}> {props.body.status}</span> */}
        {/* <span style={statusColor}> {props.body.type} </span> */}
        {/* //TODO: LIMIT height */}
        <div style={messageBubble}>{props.body.message}</div>

        <div>
          <span> Address: </span> <span> {props.body.address} </span>
          {/* //TODO: Add font awesome */}
          <Button>&</Button>
        </div>
      </Badge>
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
