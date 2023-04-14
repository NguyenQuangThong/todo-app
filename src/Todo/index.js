import { useEffect, useState } from "react";
import Add from "../Add";
import CheckAll from "../CheckAll";
import Status from "../Status";
import CheckBox from "../CheckBox";
import "./style.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = () => {
  const originalData = [
    {
      id: 0,
      value: 1,
    },
    {
      id: 1,
      value: 2,
    },
  ];

  if (
    !localStorage.getItem("list") ||
    JSON.parse(localStorage.getItem("list")).length === 0
  ) {
    console.log("Set local storage");
    localStorage.setItem("list", JSON.stringify(originalData));
  }
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("list");
    if (data) setList(JSON.parse(data));
  }, []);

  const handleCheckAll = (e) => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(list.map((i) => i.id));
    if (isCheckAll) setIsCheck([]);
  };

  const handleClick = (e) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, parseInt(id)]);
    if (!checked) setIsCheck(isCheck.filter((i) => i !== parseInt(id)));
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value === "") alert("Enter the task first, You poor!");
      else {
        const newList = [
          ...list,
          { id: list[list.length - 1].id + 1, value: e.target.value },
        ];
        e.target.value = "";
        localStorage.setItem("list", JSON.stringify(newList));
        setList(newList);
      }
    }
  };

  const remove = (data) => {
    const rest = list.filter((i) => i !== data);
    localStorage.setItem("list", JSON.stringify(rest));
    setList(rest);
  };

  const all = (e) => {
    console.log("Show all");
  };

  let List = list.map((item) => {
    return (
      <div className="list" key={item.id}>
        <div>
          <CheckBox
            type="checkbox"
            id={item.id}
            name={item.value}
            onChange={handleClick}
            checked={isCheck.includes(item.id)}
          />
          &nbsp;
          {item.value}
        </div>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => remove(item)}
          className="remove"
        ></FontAwesomeIcon>
      </div>
    );
  });

  return (
    <div className="todo">
      <Add onKeyDown={pressEnter}></Add>
      <div className="list1">{List}</div>
      <hr></hr>
      <CheckAll
        change={handleCheckAll}
        isCheck={isCheck.length}
        list={list.length}
      ></CheckAll>
      <hr></hr>
      <Status all={all}></Status>
    </div>
  );
};

export default Todo;
