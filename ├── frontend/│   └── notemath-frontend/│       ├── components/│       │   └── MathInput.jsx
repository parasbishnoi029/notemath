import { useEffect, useRef } from "react";
import "mathlive";

/*
This component:
- Shows math keyboard
- Returns LaTeX like: \int x^2 dx
*/

export default function MathInput({ onChange }) {
  const ref = useRef(null);

  useEffect(() => {
    const mf = ref.current;

    mf.addEventListener("input", () => {
      // convert visual math → LaTeX
      onChange(mf.getValue("latex"));
    });
  }, [onChange]);

  return (
    <math-field
      ref={ref}
      style={{
        width: "100%",
        fontSize: "1.5rem",
        padding: "10px",
        border: "1px solid #ccc",
      }}
    />
  );
}
