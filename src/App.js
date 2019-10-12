import React from "react";
import "./App.css";
import {useRoutes, usePath} from 'hookrouter';
import Routes from './Router';
import Header from './Header';

const SmartNotFound = () => {
	const path = usePath();
	return (
		<React.Fragment>
      <Header />
			<h3>404 - Not Found</h3>
			<p>Invalid path: {path}</p>
		</React.Fragment>
	);
};

function App() {
  const routeResult = useRoutes(Routes)
  return routeResult || <SmartNotFound />;
}

export default App;
