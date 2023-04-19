import "./style.css";

const Status = ({ all, active, completed, status, index }) => {
  const list = [
    { func: all, name: "All" },
    { func: active, name: "Active" },
    { func: completed, name: "Completed" },
  ];
  console.log(index);
  return (
    <div className="status">
      {list.map((i, k) => {
        return (
          <div key={k}>
            <button onClick={i.func} className={`${k === index ? status : ""}`}>
              {i.name}
            </button>
            &nbsp;
          </div>
        );
      })}
    </div>
  );
};

export default Status;
