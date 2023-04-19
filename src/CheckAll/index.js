import "./style.css";

const CheckAll = ({ change, isCheck, list, isCheckAll }) => {
  return (
    <div className="checkall">
      <div>
        <input type="checkbox" onChange={change} checked={isCheckAll} />
        Check All
      </div>
      <div>{list - isCheck} item(s) remain</div>
    </div>
  );
};

export default CheckAll;
