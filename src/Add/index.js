import "./style.css";
const Add = ({ onKeyDown }) => {
  return (
    <input
      className="add"
      type="text"
      placeholder="What needs to be done"
      onKeyDown={onKeyDown}
    ></input>
  );
};

export default Add;
