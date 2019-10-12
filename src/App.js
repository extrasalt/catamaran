import React from "react";
import "./App.css";
import {useRoutes, usePath} from 'hookrouter';
import Routes from './Router';

function Nav() {
  var style = {
    backgroundColor: "red",
    width: "100%",
    height: 40
  };

  return <div style={style}> </div>;
}

const SmartNotFound = () => {
	const path = usePath();
	return (
		<React.Fragment>
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
