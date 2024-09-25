import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
import "./App.css";

function App() {
  const [results, setResults] = useState("");
  const [userInput, setUserInput] = useState("");
  const [valid, setValid] = useState(true);
  const styleValid = `greenyellow`;
  const styleInvalid = `red`;
  const [resultStyle, setResultStyle] = useState(styleValid);

  const isValid = (input) => {
    console.log(userInput.value);
    const regex = /^(1)?\s*?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
    return input.match(regex);
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setUserInput(e.target.value);
  };

  const handleClick = () => {
    console.log(userInput);
    if (userInput) {
      if (isValid(userInput)) {
        setResultStyle(styleValid);
        setResults(`Valid US number: ${userInput}`);
        setValid(true);
      } else {
        setResults(`Invalid US number: ${userInput}`);
        setResultStyle(styleInvalid);
        setValid(false);
      }
    } else {
      alert("Please provide a phone number");
    }
  };

  const handleClear = () => {
    setResults("");
  };

  return (
    <>
      <div>
        <h1>Cell Validator</h1>
        <h2>A app to help vefiy that number</h2>
        <p>Is that really a valid US number?</p>
      </div>
      <div>
        <input value={userInput} id="user-input" onChange={handleChange} />
        <button id="check-btn" onClick={handleClick}>
          Check
        </button>
        <button id="clear-btn" onClick={handleClear}>
          Clear
        </button>
      </div>
      <div id="results-div" style={{ color: `${resultStyle}` }}>
        {results}
        <span style={{ marginLeft: ".2rem" }}>
          {results ? (
            valid ? (
              <FontAwesomeIcon icon={faCheck} />
            ) : (
              <FontAwesomeIcon icon={faX} />
            )
          ) : null}
        </span>
      </div>
    </>
  );
}

export default App;
