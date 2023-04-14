import "./style.css";

const CheckBox = ({ type, id, name, onChange, checked }) => {
  return (
    <input
      className="checkbox"
      type={type}
      id={id}
      name={name}
      onChange={onChange}
      checked={checked}
    ></input>
  );
};

export default CheckBox;
