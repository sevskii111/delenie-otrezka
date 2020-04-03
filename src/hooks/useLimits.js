import React, { useState } from "react";
import { Col, Input, Label, FormGroup } from "reactstrap";

const useLimits = () => {
  const [intervalStart, setIntervalStart] = useState(0);
  const [intervalEnd, setIntervalEnd] = useState(1);

  const el = (
    <>
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
            onChange={e =>
              setIntervalStart(Math.min(Number(e.target.value), intervalEnd))
            }
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
            onChange={e =>
              setIntervalEnd(Math.max(Number(e.target.value), intervalStart))
            }
          ></Input>
        </Col>
      </FormGroup>
    </>
  );

  return [el, { intervalStart, intervalEnd }];
};

export default useLimits;
