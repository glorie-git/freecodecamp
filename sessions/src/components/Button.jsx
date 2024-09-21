const Button = ({ id, onClickCallBackFunction, children }) => {
  return (
    <button id={id} onClick={onClickCallBackFunction}>
      {children}
    </button>
  );
};

export default Button;
