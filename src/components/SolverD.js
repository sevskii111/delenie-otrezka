import React, { useState, useEffect } from "react";
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

const SolverD = () => {
  const [expression, setExpression] = useState("x^3+2x-2");
  const [expressionError, setExpressionError] = useState(false);
  const [compiledExpression, setCompiledExpression] = useState({});
  const [intervalStart, setIntervalStart] = useState(0);
  const [intervalEnd, setIntervalEnd] = useState(1);
  const [eps, setEps] = useState(0.1);
  const [epsError, setEpsError] = useState(false);
  const [steps, setSteps] = useState([]);
  const [showSteps, setShowSteps] = useState(false);
  const [resultWarning, setResultWarning] = useState(false);
  const [result, setResult] = useState(0.1);

  useEffect(() => {
    setExpressionError(false);
    try {
      const parsedExpression = parse(expression);
      const compiledExpression = parsedExpression.compile();

      const testScope = {
        x: 0
      };
      compiledExpression.evaluate(testScope);

      setCompiledExpression(compiledExpression);
    } catch (e) {
      setExpressionError(true);
    }
  }, [expression]);

  useEffect(() => {
    if (!compiledExpression.evaluate) {
      return;
    }
    if (eps === 0) {
      setEpsError(true);
      return;
    }
    setEpsError(false);
    let a = intervalStart;
    let b = intervalEnd;
    let newSteps = [[a, b]];
    let i = 0;
    while (b - a > 2 * eps) {
      const c = (a + b) / 2;
      const aScope = {
        x: a
      };
      const cScope = {
        x: c
      };
      if (
        compiledExpression.evaluate(aScope) *
          compiledExpression.evaluate(cScope) >
        0
      ) {
        a = c;
      } else {
        b = c;
      }
      i++;
      newSteps.push([a, b]);
      if (i > 1000) {
        setResultWarning(true);
        setSteps(newSteps);
        setEpsError(true);
        return;
      }
    }
    const aScope = {
      x: a
    };
    const bScope = {
      x: b
    };

    setResultWarning(
      compiledExpression.evaluate(aScope) *
        compiledExpression.evaluate(bScope) >
        0
    );
    setSteps(newSteps);
    setResult((a + b) / 2);
  }, [compiledExpression, intervalStart, intervalEnd, eps]);

  function setCorrectIntervalStart(newIntervalStart) {
    setIntervalStart(Math.min(Number(newIntervalStart), intervalEnd));
  }

  function setCorrectIntervalEnd(newIntervalEnd) {
    setIntervalEnd(Math.max(Number(newIntervalEnd), intervalStart));
  }

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
              value={expression}
              invalid={expressionError}
              onChange={e => setExpression(e.target.value)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs={2}>
            <Label htmlFor="intervalStart" className="col-form-label">
              Начало промежутка:
            </Label>
          </Col>
          <Col xs={3}>
            <Input
              id="intervalStart"
              type="number"
              value={intervalStart || ""}
              placeholder="0"
              onChange={e => setCorrectIntervalStart(e.target.value)}
            ></Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col xs={2}>
            <Label htmlFor="intervalEnd" className="col-form-label">
              Конец промежутка:
            </Label>
          </Col>
          <Col xs={3}>
            <Input
              id="intervalEnd"
              type="number"
              value={intervalEnd || ""}
              placeholder="0"
              onChange={e => setCorrectIntervalEnd(e.target.value)}
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
              value={eps}
              onChange={e => setEps(Math.max(0, Number(e.target.value)))}
              invalid={epsError}
            ></Input>
          </Col>
        </FormGroup>
        <Row hidden={expressionError || epsError}>
          <Col>
            Значение корня с заданной точностью равно: <b>{result}</b>
          </Col>
        </Row>
        <Row hidden={!resultWarning}>
          <Col className="text-danger">
            Вероятно вычесленный корень не является верным
          </Col>
        </Row>
        <div className="mt-1" hidden={expressionError}>
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
                {steps.map(([a, b], i) => (
                  <p key={i}>
                    [{a}, {b}]
                  </p>
                ))}
              </Collapse>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default SolverD;
