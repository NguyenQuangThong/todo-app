import "./style.css";

const CheckAll = ({ change, isCheck, list }) => {
  return (
    <div className="checkall">
      <div>
        <input type="checkbox" onChange={change} />
        Check All
      </div>
      <div>{list - isCheck} item(s) remain</div>
    </div>
  );
};

export default CheckAll;
