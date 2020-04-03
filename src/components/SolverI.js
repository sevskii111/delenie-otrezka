import React, { useState, useMemo } from "react";
import {
  Col,
  Input,
  Label,
  FormGroup,
  Container,
  Row,
  Button,
  Collapse
} from "reactstrap";
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

const solve = ({ error, compiled }, eps) => {
  let steps = [];

  if (error) {
    return { error: true, solution: "", steps: [] };
  }

  let x1 = 1;
  let x2 = compiled.evaluate({
    x: 1
  });

  while (Math.abs(x2 - x1) > eps) {
    steps.push(x1);
    x1 = x2;
    x2 = compiled.evaluate({
      x: x1
    });
    if (steps.length > 1000) {
      return { error: true, solution: "", steps };
    }
  }
  steps.push(x1);

  return { error: false, solution: x1, steps };
};

const SolverI = () => {
  const [expresson, setExpression] = useState("1 / (2 + x^2)");
  const compiledExpression = useMemo(() => compileExpression(expresson), [
    expresson
  ]);
  const [eps, setEps] = useState(0.1);
  const solution = useMemo(() => solve(compiledExpression, eps), [
    compiledExpression,
    eps
  ]);
  const [showSteps, setShowSteps] = useState(false);

  console.log(solution);

  return (
    <div className="mt-2">
      <Container>
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
              value={eps || ""}
              onChange={e => setEps(Math.max(0, Number(e.target.value)))}
              invalid={solution.error}
            ></Input>
          </Col>
        </FormGroup>
        <div hidden={compiledExpression.error || solution.error}>
          <Row>
            <Col>
              Значение корня с заданной точностью равно:{" "}
              <b>{solution.solution}</b>
            </Col>
          </Row>
          <Row>
            <Col xs={4}>
              <Button onClick={() => setShowSteps(!showSteps)}>
                {showSteps ? "Спрятать шаги" : "Показать шаги"}
              </Button>
            </Col>
          </Row>
          <Row>
            <Col>
              <Collapse isOpen={showSteps}>
                {solution.steps.map((a, i) => (
                  <p key={i}>{a}</p>
                ))}
              </Collapse>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SolverI;
