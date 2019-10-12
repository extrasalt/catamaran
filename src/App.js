import React from "react";
import "./App.css";
import { useRoutes } from "hookrouter";
import Routes from "./Router";

function Nav() {
  var style = {
    backgroundColor: "red",
    width: "100%",
    height: 40
  };

  return <div style={style}> </div>;
}

// function App() {
//   return (
//     <div className="App">
//       <Nav />
//       <DetailedView />
//     </div>
//   );
// }

function App() {
  const routeResult = useRoutes(Routes);
  return routeResult;
}

export default App;
