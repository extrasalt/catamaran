import React from "react";
import IssueForm from "./forms/IssueForm";
import { DetailedView } from "./DetailedView";
import BoardView from "./BoardView.js";

const routes = {
  "/create": () => <IssueForm />,
  "/show": () => <DetailedView />,
  "/": () => <BoardView />
};
export default routes;
