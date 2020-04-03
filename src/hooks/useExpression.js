import React, { useState, useMemo } from "react";
import { Col, Input, Label, FormGroup } from "reactstrap";
import { parse } from "mathjs";

const compileExpression = expression => {
  try {
    const compiled = parse(expression).compile();
    compiled.evaluate({ x: 0 });
    return {
      compiled,
      error: false
    };
  } catch (e) {
    return {
      error: true
    };
  }
};

const useExpression = () => {
  const [expresson, setExpression] = useState("1 / (2 + x^2)");
  const compiledExpression = useMemo(() => compileExpression(expresson), [
    expresson
  ]);

  const el = (
    <FormGroup row>
      <Col xs={2}>
        <Label htmlFor="exression" className="col-form-label">
          Выражение:
        </Label>
      </Col>
      <Col xs={3}>
        <Input
          id="exression"
          type="text"
          value={expresson}
          invalid={compiledExpression.error}
          onChange={e => setExpression(e.target.value)}
        ></Input>
      </Col>
    </FormGroup>
  );

  return [el, compiledExpression];
};

export default useExpression;
