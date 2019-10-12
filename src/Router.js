import React from 'react';
import IssueForm from './forms/IssueForm';
import DetailedView from './DetailedView';

const routes = {
    "/create": () => <IssueForm />,
    "/show": () => <DetailedView />,
  };
  export default routes;