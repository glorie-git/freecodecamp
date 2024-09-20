const Button = ({ onClick, className, id, value }) => {
  return (
    <button onClick={onClick} className={className} id={id}>
      {value}
    </button>
  );
};

export default Button;
