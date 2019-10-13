import React from 'react';
import IssueForm from './forms/IssueForm';
import { DetailedView } from './DetailedView';
import RegistrationForm from './forms/Registration';
import BoardView from "./BoardView";
import SigninForm from './forms/Signin';
import Header from './Header';

const SuccessPage = () => {
	return (
		<React.Fragment>
      	<Header />
			<h3>Your issue has been successfully registered with us. Updates will be sent through whatsapp.</h3>
		</React.Fragment>
	);
};


const routes = {
    "/create": () => <IssueForm />,
    "/show/:id": ({id}) => <DetailedView id={id} />,
    "/register": () => <RegistrationForm />,
    "/signin": () => <SigninForm />,
    "/success": () => <SuccessPage />,
    "/": () => <BoardView />
  };
export default routes;