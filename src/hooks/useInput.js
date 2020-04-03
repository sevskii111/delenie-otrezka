import React, { useState } from "react";
import { Col, Input, Label, FormGroup } from "reactstrap";

const useInput = (
  label,
  initialValue,
  min = Number.MIN_SAFE_INTEGER,
  max = Number.MAX_SAFE_INTEGER
) => {
  const [value, setValue] = useState(initialValue);

  const el = (
    <FormGroup row>
      <Col xs={2}>
        <Label htmlFor={label} className="col-form-label">
          {label}:
        </Label>
      </Col>
      <Col xs={3}>
        <Input
          id={label}
          type="number"
          value={value}
          onChange={e =>
            setValue(Math.min(max, Math.max(min, Number(e.target.value))))
          }
        ></Input>
      </Col>
    </FormGroup>
  );

  return [el, value];
};

export default useInput;
