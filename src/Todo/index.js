import { useEffect, useState } from "react";
import Add from "../Add";
import CheckAll from "../CheckAll";
import Status from "../Status";
import CheckBox from "../CheckBox";
import "./style.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Todo = () => {
  if (
    !localStorage.getItem("list") ||
    JSON.parse(localStorage.getItem("list")).length === 0
  ) {
    console.log("Set local storage");
    localStorage.setItem("list", JSON.stringify([]));
  }
  if (
    !localStorage.getItem("isCheck") ||
    JSON.parse(localStorage.getItem("isCheck")).length === 0
  ) {
    localStorage.setItem("isCheck", JSON.stringify([]));
  }
  if (
    !localStorage.getItem("isCheckAll") ||
    JSON.parse(localStorage.getItem("isCheckAll")).length === 0
  ) {
    localStorage.setItem("isCheckAll", false);
  }

  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState(
    JSON.parse(localStorage.getItem("isCheck"))
  );
  const [list, setList] = useState(JSON.parse(localStorage.getItem("list")));
  const [button, setButton] = useState(true);
  const [index, setIndex] = useState(0);
  const [enter, setEnter] = useState(-1);
  const status = "active";

  useEffect(() => {
    switch (index) {
      case 0:
        all();
        break;
      case 1:
        active();
        break;
      case 2:
        completed();
        break;
      default:
        break;
    }
    localStorage.setItem("isCheck", JSON.stringify(isCheck));
  }, [isCheck]);

  useEffect(() => {
    if (
      localStorage.getItem("isCheck").length === JSON.stringify(list).length
    ) {
      localStorage.setItem("isCheckAll", true);
      setIsCheckAll(true);
    } else {
      localStorage.setItem("isCheckAll", false);
      setIsCheckAll(false);
    }
  }, [isCheck, list]);

  const handleCheckAll = (e) => {
    localStorage.setItem("isCheckAll", !isCheckAll);
    setIsCheckAll(!isCheckAll);
    const temp = list.map((i) => i);
    setIsCheck(temp);
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleClick = (e) => {
    const { id, checked, name } = e.target;
    const temp = [...isCheck, { id: parseInt(id), value: name }];
    setIsCheck(temp);
    if (!checked) {
      const temp = isCheck.filter((i) => i.id !== parseInt(id));
      setIsCheck(temp);
    }
  };

  const pressEnter = (e) => {
    if (e.keyCode === 13) {
      if (e.target.value === "") alert("Enter the task first, You poor!");
      else {
        let newList;
        if (list.length > 0) {
          newList = [
            ...list,
            { id: list[list.length - 1].id + 1, value: e.target.value },
          ];
          setEnter(list[list.length - 1].id + 1);
        } else {
          newList = [{ id: 0, value: e.target.value }];
          setEnter(0);
        }
        e.target.value = "";
        localStorage.setItem("list", JSON.stringify(newList));
        setList(newList);
      }
    }
  };

  const remove = (data) => {
    const listRemain = list.filter((i) => i !== data);
    const isCheckRemain = isCheck.filter((i) =>
      JSON.stringify(listRemain).includes(JSON.stringify(i))
    );
    localStorage.setItem("list", JSON.stringify(listRemain));
    setList(listRemain);
    setIsCheck(isCheckRemain);
  };

  const all = (e) => {
    setList(JSON.parse(localStorage.getItem("list")));
    setButton(true);
    setIndex(0);
  };

  const active = (e) => {
    setButton(false);
    let temp = JSON.parse(localStorage.getItem("list"));
    for (let i = 0; i < isCheck.length; i++)
      if (temp.filter((item) => item.id !== isCheck[i].id).length >= 0) {
        temp = temp.filter((item) => item.id !== isCheck[i].id);
      }
    setList(temp);
    setIndex(1);
  };

  const completed = (e) => {
    setButton(false);
    setList(isCheck);
    setIndex(2);
  };

  let List = list.map((item) => {
    return (
      <div className="list" key={item.id}>
        <div className={`${item.id === enter ? "child" : ""}`}>
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
        {index === 0 ? (
          <FontAwesomeIcon
            icon={faXmark}
            onClick={() => remove(item)}
            className="remove"
            style={{ width: "10px" }}
          ></FontAwesomeIcon>
        ) : (
          ""
        )}
      </div>
    );
  });

  return (
    <div>
      <h1>TO DO LIST</h1>
      <div className="todo">
        {index === 0 ? <Add onKeyDown={pressEnter}></Add> : ""}
        <div className="list1">{List}</div>
        <hr></hr>
        {button ? (
          <div>
            <CheckAll
              change={handleCheckAll}
              isCheck={isCheck.length}
              list={list.length}
              isCheckAll={isCheckAll}
            ></CheckAll>
            <hr></hr>
          </div>
        ) : (
          ""
        )}
        <Status
          all={all}
          active={active}
          completed={completed}
          status={status}
          index={index}
        ></Status>
      </div>
    </div>
  );
};

export default Todo;
