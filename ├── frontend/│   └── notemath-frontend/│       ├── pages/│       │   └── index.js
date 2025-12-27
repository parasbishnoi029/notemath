import { useState } from "react";
import dynamic from "next/dynamic";

// KaTeX for math rendering
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// 🚨 IMPORTANT: MathInput must be loaded only on client
const MathInput = dynamic(() => import("../components/MathInput"), {
  ssr: false,
});

export default function Home() {
  const [latex, setLatex] = useState("");

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>📘 NoteMath</h1>

      <p>Type math using the keyboard below</p>

      {/* Math keyboard */}
      <MathInput onChange={setLatex} />

      {/* Live preview */}
      {latex && (
        <>
          <h3>Preview</h3>
          <BlockMath math={latex} />
        </>
      )}
    </div>
  );
}
