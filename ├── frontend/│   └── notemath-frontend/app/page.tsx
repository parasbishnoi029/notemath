"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

const MathInput = dynamic(() => import("../components/MathInput"), {
  ssr: false,
});

export default function Home() {
  const [latex, setLatex] = useState("");

  return (
    <main style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>📘 NoteMath</h1>
      <p>Type math using the keyboard below</p>

      <MathInput onChange={setLatex} />

      {latex && (
        <>
          <h3>Preview</h3>
          <BlockMath math={latex} />
        </>
      )}
    </main>
  );
}
