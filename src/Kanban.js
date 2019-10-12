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
      draggedOverCol: 0,
      data: props.data
    };
    this.handleOnDragEnter = this.handleOnDragEnter.bind(this);
    this.handleOnDragEnd = this.handleOnDragEnd.bind(this);
    this.columns = [
      { name: "Open", stage: 1 },
      { name: "Dispatched", stage: 2 },
      { name: "Completed", stage: 3 }
    ];
  }

  componentDidMount() {
    this.setState({ projects: projectList, isLoading: false });
  }

  //this is called when a Kanban card is dragged over a column (called by column)
  handleOnDragEnter(e, stageValue) {
    this.setState({ draggedOverCol: stageValue });
  }

  //this is called when a Kanban card dropped over a column (called by card)
  handleOnDragEnd(e, project) {
    console.log(project);
    const updatedProjects = this.state.projects.slice(0);
    updatedProjects.find(projectObject => {
      return projectObject.name === project.name;
    }).project_stage = this.state.draggedOverCol;
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
                return parseInt(project.project_stage, 10) === column.stage;
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
          key={project.name}
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
      collapsed: true
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
        <Ticket id={2} body={issueBody} />
      </div>
    );
  }
}

/*
 * Projects to be displayed on Kanban Board
 */
let projectList = [
  {
    name: "Ticket 1",
    issueType: "",
    number: "",
    description: "Help need supplies",
    project_stage: 1
  },
  {
    name: "Ticket 2",
    issueType: "",
    number: "",
    description: "Stranded on XXX lane",
    project_stage: 2
  },
  {
    name: "Ticket 3",
    issueType: "",
    number: "",
    description: "Need help checking on family",
    project_stage: 3
  }
];

export default Kanban;
