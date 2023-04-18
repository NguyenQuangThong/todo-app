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
      value: "1",
    },
    {
      id: 1,
      value: "2",
    },
  ];

  if (
    !localStorage.getItem("list") ||
    JSON.parse(localStorage.getItem("list")).length === 0
  ) {
    console.log("Set local storage");
    localStorage.setItem("list", JSON.stringify(originalData));
  }
  if (
    !localStorage.getItem("isCheck") ||
    JSON.parse(localStorage.getItem("isCheck").length === 0)
  ) {
    localStorage.setItem("isCheck", []);
  }
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState([]);
  const [list, setList] = useState([]);
  const [button, setButton] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem("list");
    const check = localStorage.getItem("isCheck");
    if (data) setList(JSON.parse(data));
    if (check) setIsCheck(JSON.parse(check));
  }, []);

  const handleCheckAll = (e) => {
    setIsCheckAll(!isCheckAll);
    const temp = list.map((i) => i);
    localStorage.setItem("isCheck", JSON.stringify(temp));
    setIsCheck(temp);
    if (isCheckAll) {
      localStorage.setItem("isCheck", []);
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    const temp = [...isCheck, { id: parseInt(id), value: name }];
    localStorage.setItem("isCheck", JSON.stringify(temp));
    setIsCheck(temp);
    if (!checked) {
      const temp = isCheck.filter((i) => i.id !== parseInt(id));
      localStorage.setItem("isCheck", JSON.stringify(temp));
      setIsCheck(temp);
    }
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
    setList(JSON.parse(localStorage.getItem("list")));
    setButton(true);
  };

  const active = (e) => {
    setButton(false);
    let temp = JSON.parse(localStorage.getItem("list"));
    for (let i = 0; i < isCheck.length; i++)
      if (temp.filter((item) => item.id !== isCheck[i].id).length >= 0) {
        temp = temp.filter((item) => item.id !== isCheck[i].id);
      }
    setList(temp);
  };

  const completed = (e) => {
    setButton(false);
    setList(isCheck);
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
            checked={isCheck.filter((i) => i.id === item.id).length > 0}
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

  const checkAll = button ? (
    <div>
      <CheckAll
        change={handleCheckAll}
        isCheck={isCheck.length}
        list={list.length}
      ></CheckAll>
      <hr></hr>
    </div>
  ) : (
    ""
  );

  return (
    <div>
      <h1>TO DO LIST</h1>
      <div className="todo">
        <Add onKeyDown={pressEnter}></Add>
        <div className="list1">{List}</div>
        <hr></hr>
        {checkAll}
        <Status all={all} active={active} completed={completed}></Status>
      </div>
    </div>
  );
};

export default Todo;
