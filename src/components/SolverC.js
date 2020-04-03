import React, { useMemo } from "react";
import { Container } from "reactstrap";
import useExpression from "../hooks/useExpression";
import useLimits from "../hooks/useLimits";
import useInput from "../hooks/useInput";
import Solution from "./Solution";
import { derivative } from "mathjs";
import useEpsilon from "../hooks/useEpsilon";

const solve = ({ error, compiled }, eps, m, x) => {
  if (error) {
    return { error: true, solution: "", value: 0 };
  }

  try {
    console.log(compiled);
    const d = derivative(compiled, "x");
    console.log(d);

    while (Math.abs(compiled.evaluate({ x })) / m > eps) {
      x = x - compiled.evaluate({ x }) / d.evaluate({ x });
    }

    return { error: true, solution: x, value: compiled.evaluate({ x }) };
  } catch (e) {
    console.log(e);
    return { error: true, solution: "", value: 0 };
  }
};

const SolverC = () => {
  const [Expression, compiledExpression] = useExpression();
  const [Eps, eps] = useEpsilon();
  const [MInput, m] = useInput("Параметр M", 1);
  const [XInput, x] = useInput("Начальное приближение", 1);

  const result = useMemo(() => solve(compiledExpression, eps, m, x), [
    compiledExpression,
    eps,
    m,
    x
  ]);

  return (
    <div className="mt-2">
      <Container>
        {Expression}
        {Eps}
        {MInput}
        {XInput}
        <Solution
          hidden={result.error}
          result={result.solution}
          value={result.value}
        />
      </Container>
    </div>
  );
};

export default SolverC;
