import { useState, useRef } from "react";
import Button from "./components/Button";

function App() {
  const [display, setDisplay] = useState("0");
  const [answer, setAnswer] = useState("");
  const appendDecimalRef = useRef(true);
  const OPERATOR = "operator";
  const OTHER = "other";
  const lastButtonRef = useRef(OTHER);
  const buttons = [
    { id: "clear", operator: true, value: "AC" },
    { id: "divide", operator: false, value: "/" },
    { id: "multiply", operator: false, value: "*" },
    { id: "seven", operator: false, value: "7" },
    { id: "eight", operator: false, value: "8" },
    { id: "nine", operator: false, value: "9" },
    { id: "subtract", operator: false, value: "-" },
    { id: "four", operator: false, value: "4" },
    { id: "five", operator: false, value: "5" },
    { id: "six", operator: false, value: "6" },
    { id: "add", operator: true, value: "+" },
    { id: "one", operator: false, value: "1" },
    { id: "two", operator: false, value: "2" },
    { id: "three", operator: false, value: "3" },
    { id: "equals", operator: false, value: "=" },
    { id: "zero", operator: false, value: "0" },
    { id: "decimal", operator: false, value: "." },
  ];

  // const isOperator = (value) => value in operations;
  const isOperator = (value) => ["*", "-", "/", "+"].includes(value);
  const isNumeric = (value) => !isNaN(value);
  const resetDisplay = () => {
    appendDecimalRef.current = true;
    setDisplay("0");
    setAnswer("");
  };

  let newDisplayValue = "";

  const handleEquals = () => {
    try {
      const result = new Function("return " + display)();
      setAnswer(result);
      setDisplay("ANS");
    } catch (error) {
      console.error("Error evaluating expression:", error);
    }
  };

  const clearLeadingZero = () => {
    if (newDisplayValue[0] === "0" && newDisplayValue.length > 1) {
      newDisplayValue = newDisplayValue.slice(1);
    }
  };

  const handleZero = () => {
    if (display[0] == "0" && display.length < 2) {
      // Do not add the extra leading 0, return
      return;
    }
    lastButtonRef.current = OTHER;
  };

  const handleClick = (value) => {
    newDisplayValue = display;

    if (newDisplayValue.includes("ANS") && !isOperator(value)) {
      newDisplayValue = newDisplayValue.replace("ANS", "");
    }

    if (isNumeric(value)) {
      if (value === "0") handleZero();
      newDisplayValue += value;
      clearLeadingZero();
      lastButtonRef.current = OTHER;
    } else if (isOperator(value)) {
      if (lastButtonRef.current === OPERATOR && value !== "-") {
        newDisplayValue = newDisplayValue.slice(0, newDisplayValue.length - 1);
        if (!parseInt(newDisplayValue.at(-1))) {
          newDisplayValue = newDisplayValue.slice(
            0,
            newDisplayValue.length - 1
          );
        }
      }

      appendDecimalRef.current = true;
      lastButtonRef.current = OPERATOR;

      if (answer && lastButtonRef.current === OPERATOR) {
        newDisplayValue = answer;
      }

      newDisplayValue += value;
    } else if (value === ".") {
      if (!appendDecimalRef.current) {
        return;
      }

      newDisplayValue += value;

      appendDecimalRef.current = false;
      lastButtonRef.current = OTHER;
    } else if (value === "=") {
      handleEquals();
      return;
    } else if (value === "AC") {
      appendDecimalRef.current = true;
      lastButtonRef.current = OTHER;
      resetDisplay();
    }

    value !== "AC" ? setDisplay(newDisplayValue) : resetDisplay();
    
  };

  return (
    <div id="calculator">
      <div id="display">{display === "ANS" ? answer : display}</div>
      <div id="buttons">
        {buttons.map((button, index) => (
          <Button
            key={index}
            onClick={() => handleClick(button.value)}
            className={button.operator ? OPERATOR : OTHER}
            id={button.id}
            value={button.value}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
