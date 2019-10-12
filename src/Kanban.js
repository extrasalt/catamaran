import React from "react";
import { Ticket } from "./DetailedView";

class Kanban extends React.Component {
  render() {
    const style = {
      padding: "30px",
      paddingTop: "5px"
    };

    return (
      <div style={style}>
        <KanbanBoard />
      </div>
    );
  }
}

/*
 * The Kanban Board React component
 */
class KanbanBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      projects: [],
      draggedOverCol: "",
      data: props.data
    };
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = [
      { name: "Open", stage: 1 },
      { name: "Dispatched", stage: 2 },
      { name: "Completed", stage: 3 }
    ];
    this.columnMapping = {
      1: "Open",
      2: "Dispatched",
      3: "Completed"
    };
  }

  componentDidMount() {
    this.setState({ projects: tickets, isLoading: false });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: this.columnMapping[stageValue] });
  }

  //this is called when a Kanban card dropped over a column (called by card)
  handleOnDragEnd(e, project) {
    console.log(project);
    const updatedProjects = this.state.projects.slice(0);
    updatedProjects.find(projectObject => {
      return projectObject.name === project.name;
    }).status = this.state.draggedOverCol;
    this.setState({ projects: updatedProjects });
  }

  render() {
    if (this.state.isLoading) {
      return <h3>Loading...</h3>;
    }

    return (
      <div>
        {this.columns.map(column => {
          return (
            <KanbanColumn
              name={column.name}
              stage={column.stage}
              projects={this.state.projects.filter(project => {
                return project.status === column.name;
              })}
              onDragEnter={this.handleOnDragEnter}
              onDragEnd={this.handleOnDragEnd}
              key={column.stage}
            />
          );
        })}
      </div>
    );
  }
}

/*
 * The Kanban Board Column React component
 */
class KanbanColumn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { mouseIsHovering: false };
  }

  componentWillReceiveProps(nextProps) {
    this.state = { mouseIsHovering: false };
  }

  generateKanbanCards() {
    return this.props.projects.slice(0).map(project => {
      return (
        <KanbanCard
          project={project}
          key={project.number}
          onDragEnd={this.props.onDragEnd}
        />
      );
    });
  }

  render() {
    const columnStyle = {
      display: "inline-block",
      verticalAlign: "top",
      marginRight: "5px",
      marginBottom: "5px",
      paddingLeft: "10px",
      paddingRight: "10px",
      paddingTop: "0px",
      width: "350px",
      borderRadius: 5,
      backgroundColor: this.state.mouseIsHovering ? "#ccc" : "#eee"
    };
    return (
      <div
        style={columnStyle}
        onDragEnter={e => {
          this.setState({ mouseIsHovering: true });
          this.props.onDragEnter(e, this.props.stage);
        }}
        onDragExit={e => {
          this.setState({ mouseIsHovering: false });
        }}
      >
        <h4>
          {this.props.name} ({this.props.projects.length})
        </h4>
        {this.generateKanbanCards()}
        <br />
      </div>
    );
  }
}

/*
 * The Kanban Board Card component
 */
class KanbanCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: true,
      tickets: tickets
    };
  }

  render() {
    var issueBody = {
      status: "Dispatched",
      type: "Supplies",
      message: "Fire!! Fire!!",
      address: "OMR",
      number: "123"
    };
    const cardStyle = {
      paddingLeft: "0px",
      paddingTop: "5px",
      paddingBottom: "5px",
      marginLeft: "0px",
      marginRight: "5px",
      marginBottom: "5px",
      borderRadius: 5,
      background: "#fff",
      boxShadow:
        "0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)"
    };

    return (
      <div
        style={cardStyle}
        draggable={true}
        onDragEnd={e => {
          this.props.onDragEnd(e, this.props.project);
        }}
      >
        <Ticket body={this.props.project} />
      </div>
    );
  }
}

/*
 * Projects to be displayed on Kanban Board
 */
let tickets = [
  {
    status: "Dispatched",
    type: "Supplies",
    message: "Help need supplies",
    address: "OMR",
    number: "123",
    project_stage: 1
  },
  {
    status: "Open",
    type: "Stranded",
    message: "Stranded on XXX lane",
    address: "Perungudi",
    number: "444444",
    project_stage: 2
  },
  {
    status: "Completed",
    type: "Stranded",
    message: "Need help checking on my family",
    address: "Perungudi",
    number: "444444",
    project_stage: 3
  }
];

export default Kanban;
