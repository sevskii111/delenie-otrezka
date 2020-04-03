import React, { useState } from "react";
import { Col, Input, Label, FormGroup } from "reactstrap";

const useEpsilon = () => {
  const [eps, setEps] = useState(0.1);

  const el = (
    <FormGroup row>
      <Col xs={2}>
        <Label htmlFor="epsilon" className="col-form-label">
          Точность:
        </Label>
      </Col>
      <Col xs={3}>
        <Input
          id="epsilon"
          type="number"
          value={eps}
          onChange={e => setEps(Math.max(0, Number(e.target.value)))}
        ></Input>
      </Col>
    </FormGroup>
  );

  return [el, eps];
};

export default useEpsilon;
