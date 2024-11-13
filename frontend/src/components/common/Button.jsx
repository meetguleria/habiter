function Button({ children, onClick, style }) {
  return (
    <button
      onClick={onClick}
      className="btn"
      style={style}
    >
      {children}
    </button>
  );
}

export default Button;
