import "./style.css";

const Status = ({ all, active, completed }) => {
  return (
    <div className="status">
      <button onClick={all}>All</button>
      &nbsp;
      <button onClick={active}>Active</button>
      &nbsp;
      <button onClick={completed}>Completed</button>
    </div>
  );
};

export default Status;
