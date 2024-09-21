import { useState, useEffect, useRef } from "react";
import { beep as alertSound } from "./assests/sounds";
import Button from "./components/Button";

function App() {
  const timerRef = useRef(null);
  const root = document.querySelector(":root");
  const MODE = {
    SESSION: "session",
    BREAK: "break",
  };
  // units are in seconds
  const DEFAULT = {
    session: 25 * 60,
    break: 5 * 60,
  };

  const [sessionLength, setSessionLength] = useState(DEFAULT.session);
  const [breakLength, setBreakLength] = useState(DEFAULT.break);
  const [pauseTimer, setPauseTimer] = useState(true);
  const [timeLeft, setTimeLeft] = useState(DEFAULT.session);
  const [mode, setMode] = useState(MODE.SESSION);

  const handleReset = () => {
    // stop timer
    const beep = document.getElementById("beep");
    beep.pause();
    beep.currentTime = 0;

    clearInterval(timerRef.current);

    setSessionLength(DEFAULT.session);
    setBreakLength(DEFAULT.break);
    setTimeLeft(DEFAULT.session);
    setPauseTimer(true);
    setMode(() => MODE.SESSION);
    timerRef.current = null;
  };
  // Calculate the degrees
  function calcDeg() {
    return `${360 - (timeLeft / sessionLength) * 360}deg`;
  }

  const handleStart = () => {
    root.style.setProperty("--degrees", calcDeg());
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
      setTimeLeft(sessionLength);
    } else {
      setSessionLength(newSessionLength);
      setTimeLeft(newSessionLength);
    }
  };

  const sessionIncrement = () => {
    const newSessionLength = sessionLength + 60;
    if (newSessionLength > 60 * 60) {
      setSessionLength(sessionLength);
      setTimeLeft(sessionLength);
    } else {
      setSessionLength(newSessionLength);
      setTimeLeft(newSessionLength);
    }
  };

  useEffect(() => {
    // switch between session and break
    if (timeLeft < 0) {
      const beep = document.getElementById("beep");
      beep.play();
      // switch
      if (mode === MODE.BREAK) {
        setMode(() => MODE.SESSION);
        setTimeLeft(sessionLength);
      } else {
        setMode(() => MODE.BREAK);
        setTimeLeft(breakLength);
      }
    }
  }, [MODE.BREAK, MODE.SESSION, breakLength, timeLeft, mode, sessionLength]);

  useEffect(() => {
    // Set up the interval
    if (timerRef.current) clearInterval(timerRef.current);

    const interval = setInterval(() => {
      pauseTimer ? null : setTimeLeft((prevCount) => prevCount - 1);
    }, 1000); // Update every second
    timerRef.current = interval;
    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, [pauseTimer]);

  const setMinutes = (timeLeft) => {
    return Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
  };

  const setSeconds = (timeLeft) => {
    return Math.floor(timeLeft % 60)
      .toString()
      .padStart(2, "0");
  };

  return (
    <div id="wrapper">
      <div id="top-container">
        <div id="session-label">
          <h2>Session Length</h2>
          <div id="session-length">
            <h3>{Math.floor(sessionLength / 60)}</h3>
          </div>
          <Button
            id="session-increment"
            onClickCallBackFunction={sessionIncrement}
          >
            UP
          </Button>

          <Button
            id="session-decrement"
            onClickCallBackFunction={sessionDecrement}
          >
            DOWN
          </Button>
        </div>
        <div id="break-label">
          <h2>Break Length</h2>
          <div id="break-length">
            <h3>{Math.floor(breakLength / 60)}</h3>
          </div>
          <Button id="break-increment" onClickCallBackFunction={breakIncrement}>
            UP
          </Button>
          <Button id="break-decrement" onClickCallBackFunction={breakDecrement}>
            DOWN
          </Button>
        </div>
      </div>

      <div id="timer-label">{mode.toUpperCase()}</div>
      <div id="time-left">
        {setMinutes(timeLeft)}:{setSeconds(timeLeft)}
      </div>
      <Button id="start_stop" onClickCallBackFunction={handleStart}>
        START/STOP
      </Button>
      <Button id="reset" onClickCallBackFunction={handleReset}>
        RESET
      </Button>
      <audio id="beep" src={alertSound}></audio>
    </div>
  );
}

export default App;
