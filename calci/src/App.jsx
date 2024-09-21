import { useState, useRef } from "react";
import Button from "./components/Button";

function App() {
  const [display, setDisplay] = useState("0");
  const [answer, setAnswer] = useState("");
  const appendDecimalRef = useRef(true);
  const OPERATOR = "operator";
  const OTHER = "other";
  const buttons = [
    { id: "clear", operator: true, value: "AC" },
    { id: "divide", operator: true, value: "/" },
    { id: "multiply", operator: true, value: "*" },
    { id: "seven", operator: false, value: "7" },
    { id: "eight", operator: false, value: "8" },
    { id: "nine", operator: false, value: "9" },
    { id: "subtract", operator: true, value: "-" },
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

  const isOperator = (value) => ["*", "-", "/", "+"].includes(value);
  const isNumeric = (value) => !isNaN(value);
  let newDisplayValue = "";

  const resetDisplay = () => {
    appendDecimalRef.current = true;
    setDisplay("0");
    setAnswer("");
  };

  const handleEquals = () => {
    try {
      const result = new Function("return " + display)();
      setAnswer(result);
      setDisplay("ANS");
    } catch (error) {
      console.error("Error evaluating expression:", error);
    }
  };

  const handleClick = (clickedButton) => {
    newDisplayValue = display;

    if (newDisplayValue.includes("ANS") && !isOperator(clickedButton)) {
      newDisplayValue = newDisplayValue.replace("ANS", "");
    }

    if (isNumeric(clickedButton)) {
      newDisplayValue += clickedButton;
      if (newDisplayValue[0] === "0" && newDisplayValue.length > 1) {
        newDisplayValue = newDisplayValue.slice(1);
      }
    } else if (isOperator(clickedButton)) {
      if (isOperator(newDisplayValue.at(-1)) && clickedButton !== "-") {
        newDisplayValue = newDisplayValue.slice(0, newDisplayValue.length - 1);
        if (!parseInt(newDisplayValue.at(-1))) {
          newDisplayValue = newDisplayValue.slice(
            0,
            newDisplayValue.length - 1
          );
        }
      }

      appendDecimalRef.current = true;

      if (answer) {
        newDisplayValue = answer;
      }

      newDisplayValue += clickedButton;
    } else if (clickedButton === ".") {
      if (appendDecimalRef.current) {
        newDisplayValue += clickedButton;
        appendDecimalRef.current = false;
      }
    } else if (clickedButton === "=") {
      handleEquals();
      return;
    } else if (clickedButton === "AC") {
      appendDecimalRef.current = true;
      resetDisplay();
      return;
    }

    setDisplay(newDisplayValue);
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
