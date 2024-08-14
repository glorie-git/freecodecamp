import { useState, useEffect } from "react";
import { DrumPad } from "./components";
import {
  HiHat,
  OverHat,
  Heater1,
  Heater2,
  Heater3,
  Heater4,
  Heater6,
  KicknHat,
  RP4_KICK,
} from "./assets/sounds";

function App() {
  const [pressedDrumPad, setpressedDrumPad] = useState("DRUM MACHINE READY");
  const keyboardKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

  useEffect(() => {
    const handleGlobalKeyDown = (event) => {
      const keyPressed = event.key.toUpperCase();

      if (keyboardKeys.includes(keyPressed)) {
        playDrumPad(keyPressed);
      }
    };

    document.addEventListener("keydown", handleGlobalKeyDown);

    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, []);

  const playDrumPad = (id) => {
    const playPromise = document.getElementById(id).play();
    setpressedDrumPad(document.getElementById(id).getAttribute("name"));

    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          // Audio playing
        })
        .catch((error) => {
          // Auto-play was prevented
          console.error("Error playing video:", error);
        });
    }
  };

  const handleClick = (id) => {
    playDrumPad(id);
  };

  const handleKeyDown = (e) => {
    const keyPressed = e.key.toUpperCase();

    if (keyboardKeys.includes(keyPressed)) {
      playDrumPad(keyPressed);
    }
  };

  return (
    <div id="drum-machine" onKeyDown={handleKeyDown}>
      <div id="drum-pads">
        <DrumPad
          name="Hi Hat"
          audioSrc={HiHat}
          keyboardKey="Q"
          handleClick={handleClick}
        />
        <DrumPad
          name="Over Hat"
          audioSrc={OverHat}
          keyboardKey="W"
          handleClick={handleClick}
        />
        <DrumPad
          name="Heater 1"
          audioSrc={Heater1}
          keyboardKey="E"
          handleClick={handleClick}
        />
        <DrumPad
          name="Heater 2"
          audioSrc={Heater2}
          keyboardKey="A"
          handleClick={handleClick}
        />
        <DrumPad
          name="Heater 3"
          audioSrc={Heater3}
          keyboardKey="S"
          handleClick={handleClick}
        />
        <DrumPad
          name="Heater 4"
          audioSrc={Heater4}
          keyboardKey="D"
          handleClick={handleClick}
        />
        <DrumPad
          name="Heater 6"
          audioSrc={Heater6}
          keyboardKey="Z"
          handleClick={handleClick}
        />
        <DrumPad
          name="Kick 'n Hat"
          audioSrc={KicknHat}
          keyboardKey="X"
          handleClick={handleClick}
        />
        <DrumPad
          name="RP4 Kick"
          audioSrc={RP4_KICK}
          keyboardKey="C"
          handleClick={handleClick}
        />
      </div>
      <div id="display">{pressedDrumPad}</div>
    </div>
  );
}

export default App;
