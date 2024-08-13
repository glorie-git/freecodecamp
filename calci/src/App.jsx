import { useState } from "react";

function App() {
  // const operatorRef = useRef(null);
  const [display, setDisplay] = useState(" ");
  const [answer, setAnswer] = useState("");

  const handleClick = (value) => {
    // console.log(value);
    let symbol = value;

    if (value == "add") {
      symbol = "+";
    } else if (value == "subtract") {
      symbol = "-";
    } else if (value == "divide") {
      symbol = "/";
    } else if (value == "multiply") {
      symbol = "x";
    } else if (value == "equals") {
      try {
        const answer = eval(display);
        setDisplay(display + "=" + answer);
        setAnswer(answer);
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (value !== "clear" && value !== "equals") {
      setAnswer(symbol);
      setDisplay(display + symbol);
    } else {
      setDisplay("");
      setAnswer("");
    }
  };

  return (
    <div id="calculator">
      <div id="disaply">
        <div id="calculation_display">{display}</div>
        <div id="answer_display">{answer}</div>
      </div>
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
          onClick={() => handleClick("subtrat")}
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
