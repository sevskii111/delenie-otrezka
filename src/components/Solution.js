import React from "react";
import { Col, Row } from "reactstrap";

const Solution = ({ hidden, result }) => {
  return (
    <Row hidden={hidden}>
      <Col>
        Значение корня с заданной точностью равно: <b>{result}</b>
      </Col>
    </Row>
  );
};

export default Solution;
