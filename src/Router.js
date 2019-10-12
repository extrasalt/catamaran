import React from 'react';
import IssueForm from './forms/IssueForm';
import { DetailedView } from './DetailedView';
import RegistrationForm from './forms/Registration';
import BoardView from "./BoardView";

const routes = {
    "/create": () => <IssueForm />,
    "/show/:id": ({id}) => <DetailedView id={id} />,
    "/register": () => <RegistrationForm />,
    "/": () => <BoardView />
  };
export default routes;