import { useState, useEffect, useRef } from "react";

function App() {
  // units are in seconds
  const DEFAULT = {
    session: 25 * 60,
    break: 5 * 60,
  };
  const timerRef = useRef(null);

  const [sessionLength, setSessionLength] = useState(DEFAULT.session);
  const [breakLength, setBreakLength] = useState(DEFAULT.break);
  const [pauseTimer, setPauseTimer] = useState(true);
  const [count, setCount] = useState(DEFAULT.session);

  const handleReset = () => {
    console.log("Reseting timer");
    // stop timer
    clearInterval(timerRef.current);

    // reset variables
    setSessionLength(DEFAULT.session);
    setBreakLength(DEFAULT.break);
    setCount(DEFAULT.session);
    setPauseTimer(true);
    timerRef.current = null;
  };

  const handleStart = () => {
    setPauseTimer(!pauseTimer);
  };

  const breakDecrement = () => {
    const newBreakLength = breakLength - 1;
    setBreakLength(newBreakLength <= 0 ? breakLength : newBreakLength);
  };

  const breakIncrement = () => {
    const newBreakLength = breakLength + 1;
    setBreakLength(newBreakLength > 60 ? breakLength : newBreakLength);
  };

  const sessionDecrement = () => {
    const newSessionLength = sessionLength - 1;
    setSessionLength(newSessionLength <= 0 ? sessionLength : newSessionLength);
  };

  const sessionIncrement = () => {
    const newSessionLength = sessionLength + 1;
    setSessionLength(newSessionLength > 60 ? sessionLength : newSessionLength);
  };

  useEffect(() => {
    // Set up the interval
    if (timerRef.current) clearInterval(timerRef.current);
    const interval = setInterval(() => {
      pauseTimer ? null : setCount((prevCount) => prevCount - 1);
    }, 1000); // Update every second
    timerRef.current = interval;
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [pauseTimer]); // Empty dependency array means this effect runs once on mount

  return (
    <div id="wrapper">
      <h1>Sessions by Gloire</h1>

      <div id="top-container">
        <div id="break-label">
          <h2>Break Length</h2>
          <div id="break-length">
            <h3>{breakLength / 60}</h3>
          </div>
          <button id="break-increment" onClick={breakIncrement}>
            UP
          </button>
          <button id="break-decrement" onClick={breakDecrement}>
            DOWN
          </button>
        </div>

        <div id="session-label">
          <h2>Session Length</h2>
          <div id="session-length">
            <h3>{sessionLength / 60}</h3>
          </div>
          <button id="session-increment" onClick={sessionIncrement}>
            UP
          </button>
          <button id="session-decrement" onClick={sessionDecrement}>
            DOWN
          </button>
        </div>
      </div>

      <div id="timer-label">Session</div>
      <div id="time-left">
        Paused or running (mm:ss)
        <br />
        <span>
          {Math.floor(count / 60)}:
          {Math.floor(count % 60)
            .toString()
            .padStart(2, "0")}
        </span>
      </div>
      <button id="start_stop" onClick={handleStart}>
        START/STOP
      </button>
      <button id="reset" onClick={handleReset}>
        RESET
      </button>
    </div>
  );
}

export default App;
