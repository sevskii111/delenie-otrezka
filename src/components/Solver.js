import React, { useState } from "react";
import { Row, Col, Input, Label, FormGroup } from "reactstrap";

const Solver = props => {
  const [expression, setExpression] = useState("x^3+2x-2");
  const [intervalStart, setIntervalStart] = useState("0");
  const [intervalEnd, setIntervalEnd] = useState("1");
  const [eps, setEps] = useState("0.1");
  const [result, setResult] = useState("0.1");

  return (
    <div>
      <Row>
        <FormGroup>
          <Col>
            <Label htmlFor="exression" />
          </Col>
          <Col>
            <Input id="exression" type="text" value={expression}></Input>
          </Col>
        </FormGroup>
      </Row>
    </div>
  );
};

export default Solver;
