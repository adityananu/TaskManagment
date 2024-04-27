import React from "react";
import "../App.css";
import { Link } from "react-router-dom";

const SideBar = ({ showSideBar }) => {
  return (
    <div onMouseLeave={showSideBar} className="sideBar__inner">
      <Link to="/todoList">
        <button className="sideBar__buttons">Todo</button>
      </Link>
      <Link to="/progressList">
        <button className="sideBar__buttons">Progress</button>
      </Link>
      <Link to="/doneList">
        <button className="sideBar__buttons">Done</button>
      </Link>
    </div>
  );
};

export default SideBar;
