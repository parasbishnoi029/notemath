import { useState } from "react";
import dynamic from "next/dynamic";
import axios from "axios";

import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

// 🚨 IMPORTANT: disable SSR for MathInput
const MathInput = dynamic(() => import("../components/MathInput"), {
  ssr: false,
});

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

export default function Home() {
  const [latex, setLatex] = useState("");
  const [history, setHistory] = useState([]);
  const [error, setError] = useState("");

  const solve = async () => {
    try {
      setError("");

      const res = await axios.post(`${API_URL}/solve`, { latex });

      if (res.data.error) {
        setError(res.data.error);
        return;
      }

      setHistory((prev) => [
        ...prev,
        {
          input: latex,
          steps: res.data.steps,
          answer: res.data.answer,
        },
      ]);
    } catch {
      setError("Backend not reachable");
    }
  };

  return (
    <div style={{ padding: "30px", maxWidth: "900px", margin: "auto" }}>
      <h1>📘 NoteMath</h1>

      <p>Type math using symbols or keyboard</p>

      <MathInput onChange={setLatex} />

      {latex && (
        <>
          <h3>Preview</h3>
          <BlockMath math={latex} />
        </>
      )}

      <button
        onClick={solve}
        style={{ marginTop: "15px", padding: "10px" }}
      >
        Solve
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <hr />

      {history.map((cell, i) => (
        <div key={i} style={{ marginBottom: "30px" }}>
          <BlockMath math={cell.input} />
          {cell.steps.map((s, j) => (
            <p key={j}>{j + 1}. {s}</p>
          ))}
          <BlockMath math={cell.answer} />
        </div>
      ))}
    </div>
  );
}
