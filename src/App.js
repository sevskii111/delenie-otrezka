import React from "react";
import { render } from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import SolverI from "./components/SolverI";

class App extends React.Component {
  render() {
    return (
      <div>
        <SolverI />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
