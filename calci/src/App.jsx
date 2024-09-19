import { useState, useRef } from "react";

function App() {
  const [display, setDisplay] = useState("0");
  const [answer, setAnswer] = useState("");
  const appendDecimalRef = useRef(true);
  const OPERATOR = "operator";
  const OTHER = "other";
  const lastButtonRef = useRef(OTHER);

  const handleClick = (value) => {
    let symbol = value;
    let newDisplayValue = `${display}`;

    if (
      newDisplayValue.includes("ANS") &&
      (value != "subtract" ||
        value != "add" ||
        value != "divide" ||
        value != "multiply")
    ) {
      newDisplayValue = newDisplayValue.replace("ANS", "");
    }

    if (value == "0") {
      if (display[0] == "0" && display.length < 2) {
        // Do not add the extra leading 0, return
        return;
      }
      lastButtonRef.current = OTHER;
    } else if (
      value === "subtract" ||
      value === "add" ||
      value === "divide" ||
      value === "multiply"
    ) {
      if (lastButtonRef.current === OPERATOR) {
        if (value !== "subtract") {
          newDisplayValue = newDisplayValue.slice(
            0,
            newDisplayValue.length - 1
          );

          if (!parseInt(newDisplayValue.at(-1))) {
            newDisplayValue = newDisplayValue.slice(
              0,
              newDisplayValue.length - 1
            );
          }
        }
      }

      switch (value) {
        case "add":
          symbol = "+";
          break;
        case "subtract":
          symbol = "-";
          break;
        case "divide":
          symbol = "/";
          break;
        default:
          // "multiply"
          symbol = "*";
          break;
      }

      appendDecimalRef.current = true;
      lastButtonRef.current = OPERATOR;
    } else if (value === "decimal") {
      if (!appendDecimalRef.current) {
        return;
      }
      symbol = ".";
      appendDecimalRef.current = false;
      lastButtonRef.current = OTHER;
    } else if (value === "equals") {
      try {
        const answer = new Function("return " + display)();

        appendDecimalRef.current = true;
        lastButtonRef.current = OTHER;

        setDisplay("ANS");
        setAnswer(answer);
      } catch (error) {
        console.log(display);
        console.log(error);
      }
      return;
    }

    if (parseInt(value)) {
      lastButtonRef.current = OTHER;
    }

    if (value !== "clear") {
      if (answer && lastButtonRef.current === OPERATOR) {
        console.log((newDisplayValue = answer));
      }

      newDisplayValue = newDisplayValue + symbol;
      // clean up string .e.g. remove leading 0 if not followed by decimal
      if (newDisplayValue[0] === "0" && newDisplayValue.length > 1) {
        try {
          newDisplayValue = newDisplayValue.slice(1);
        } catch (error) {
          console.log(error);
        }
      }

      setDisplay(newDisplayValue);
    } else {
      appendDecimalRef.current = true;
      lastButtonRef.current = OTHER;
      setDisplay("0");
      setAnswer("");
    }
  };

  return (
    <div id="calculator">
      <div id="answer_display">{answer}</div>
      <div id="display">{display === "ANS" ? answer : display}</div>
      <div id="buttons">
        <button onClick={() => handleClick("clear")} id="clear">
          AC
        </button>
        <button
          className="operation"
          onClick={() => handleClick("divide")}
          id="divide"
        >
          /
        </button>
        <button
          className="operation"
          onClick={() => handleClick("multiply")}
          id="multiply"
        >
          x
        </button>

        <button onClick={() => handleClick(7)} id="seven">
          7
        </button>
        <button onClick={() => handleClick(8)} id="eight">
          8
        </button>
        <button onClick={() => handleClick(9)} id="nine">
          9
        </button>
        <button
          className="operation"
          onClick={() => handleClick("subtract")}
          id="subtract"
        >
          -
        </button>

        <button onClick={() => handleClick(4)} id="four">
          4
        </button>
        <button onClick={() => handleClick(5)} id="five">
          5
        </button>
        <button onClick={() => handleClick(6)} id="six">
          6
        </button>
        <button
          className="operation"
          onClick={() => handleClick("add")}
          id="add"
        >
          +
        </button>

        <button onClick={() => handleClick(1)} id="one">
          1
        </button>
        <button onClick={() => handleClick(2)} id="two">
          2
        </button>
        <button onClick={() => handleClick(3)} id="three">
          3
        </button>
        <button onClick={() => handleClick("equals")} id="equals">
          =
        </button>

        <button onClick={() => handleClick(0)} id="zero">
          0
        </button>
        <button onClick={() => handleClick("decimal")} id="decimal">
          .
        </button>
      </div>
    </div>
  );
}

export default App;
