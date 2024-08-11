const DrumPad = ({ keyboardKey, audioSrc, name, handleClick }) => {
  return (
    <button
      id={name}
      className="drum-pad"
      onClick={() => handleClick(keyboardKey)}
    >
      {keyboardKey}
      <audio
        src={audioSrc}
        id={keyboardKey}
        name={name}
        className="clip"
      ></audio>
    </button>
  );
};

export default DrumPad;
