import { useState, useEffect, useRef } from "react";
import { beep as alertSound } from "./assests/sounds";

function App() {
  // units are in seconds
  const DEFAULT = {
    session: 25 * 60,
    break: 5 * 60,
  };
  const timerRef = useRef(null);
  const MODE = {
    SESSION: "session",
    BREAK: "break",
  };

  const [sessionLength, setSessionLength] = useState(DEFAULT.session);
  const [breakLength, setBreakLength] = useState(DEFAULT.break);
  const [pauseTimer, setPauseTimer] = useState(true);
  const [count, setCount] = useState(DEFAULT.session);
  const [mode, setMode] = useState(MODE.SESSION);
  const alert = document.getElementById("beep");

  const handleReset = () => {
    // stop timer
    clearInterval(timerRef.current);

    // stop audio
    alert.pause();
    alert.currentTime = 0;

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
    const newBreakLength = breakLength - 60;
    setBreakLength(newBreakLength <= 0 ? breakLength : newBreakLength);
  };

  const breakIncrement = () => {
    const newBreakLength = breakLength + 60;
    setBreakLength(newBreakLength > 60 * 60 ? breakLength : newBreakLength);
  };

  const sessionDecrement = () => {
    const newSessionLength = sessionLength - 60;
    if (newSessionLength <= 0) {
      setSessionLength(sessionLength);
      setCount(sessionLength);
    } else {
      setSessionLength(newSessionLength);
      setCount(newSessionLength);
    }
  };

  const sessionIncrement = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength > 60 * 60) {
      setSessionLength(sessionLength);
      setCount(sessionLength);
    } else {
      setSessionLength(newSessionLength);
      setCount(newSessionLength);
    }
  };

  useEffect(() => {
    const playAlertSound = () => {
      try {
        alert.play();
      } catch (e) {
        console.log(e);
      }
    };
    // Set up the interval
    if (timerRef.current) clearInterval(timerRef.current);

    // switch between session and break
    if (count === 0) {
      // switch
      playAlertSound();
      if (mode === MODE.BREAK) {
        setMode(() => MODE.SESSION);
        setCount(sessionLength);
      } else {
        setMode(() => MODE.BREAK);
        setCount(breakLength);
      }
      return;
    }

    const interval = setInterval(() => {
      pauseTimer ? null : setCount((prevCount) => prevCount - 1);
    }, 1000); // Update every second
    timerRef.current = interval;
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [
    DEFAULT.break,
    DEFAULT.session,
    MODE.BREAK,
    MODE.SESSION,
    alert,
    breakLength,
    count,
    mode,
    pauseTimer,
    sessionLength,
  ]); // Empty dependency array means this effect runs once on mount

  const setMinutes = (count) => {
    return Math.floor(count / 60)
      .toString()
      .padStart(2, "0");
  };

  const setSeconds = (count) => {
    return Math.floor(count % 60)
      .toString()
      .padStart(2, "0");
  };
  return (
    <div id="wrapper">
      <h1>Sessions by Gloire</h1>

      <div id="top-container">
        <div id="break-label">
          <h2>Break Length</h2>
          <div id="break-length">
            <h3>{Math.floor(breakLength / 60)}</h3>
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
            <h3>{Math.floor(sessionLength / 60)}</h3>
          </div>
          <button id="session-increment" onClick={sessionIncrement}>
            UP
          </button>
          <button id="session-decrement" onClick={sessionDecrement}>
            DOWN
          </button>
        </div>
      </div>

      <div id="timer-label">{mode.toUpperCase()}</div>
      <div id="time-left">
        {setMinutes(count)}:{setSeconds(count)}
      </div>
      <button id="start_stop" onClick={handleStart}>
        START/STOP
      </button>
      <button id="reset" onClick={handleReset}>
        RESET
      </button>
      <audio id="beep" src={alertSound}></audio>
    </div>
  );
}

export default App;
