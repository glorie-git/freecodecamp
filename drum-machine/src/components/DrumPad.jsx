import PropTypes from "prop-types";

function DrumPad({ keyboardKey, audioSrc, name, handleClick }) {
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
}

DrumPad.propTypes = {
  keyboardKey: PropTypes.string.isRequired,
  audioSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default DrumPad;
