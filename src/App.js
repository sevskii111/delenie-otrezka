import React from "react";
import { render } from "react-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Solver from "./components/Solver";

class App extends React.Component {
  render() {
    return (
      <div>
        <Solver />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
