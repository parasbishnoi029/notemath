from fastapi import FastAPI
from pydantic import BaseModel
from sympy import symbols, integrate, solve, Eq
from sympy.parsing.latex import parse_latex

app = FastAPI()
x = symbols("x")

class Input(BaseModel):
    latex: str

@app.get("/")
def health():
    return {"status": "NoteMath backend running"}

@app.post("/solve")
def solve_math(data: Input):
    latex = data.latex.strip()

    try:
        # -------- INTEGRAL --------
        if "\\int" in latex:
            cleaned = latex.replace("\\int", "").replace("dx", "").strip()
            expr = parse_latex(cleaned)
            result = integrate(expr, x)

            return {
                "type": "integral",
                "steps": [
                    f"Given the integral {latex}",
                    "Use the power rule for integration",
                    "Increase the power by 1",
                    "Divide by the new power",
                    "Add constant of integration C"
                ],
                "answer": f"{result} + C"
            }

        # -------- EQUATION --------
        if "=" in latex:
            left, right = latex.split("=")
            eq = Eq(parse_latex(left), parse_latex(right))
            sol = solve(eq, x)

            return {
                "type": "equation",
                "steps": [
                    f"Given the equation {latex}",
                    "Rearrange terms to isolate x",
                    "Solve the equation"
                ],
                "answer": f"x = {sol}"
            }

        return {"error": "Unsupported input"}

    except Exception:
        return {"error": "Invalid mathematical expression"}
