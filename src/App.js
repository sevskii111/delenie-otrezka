import React from "react";
import { render } from "react-dom";
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
