import React, { useState } from "react";
import "../App.css";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";
import { FaDotCircle } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const TaskLayout = ({ title, list, handleDel, linkTo }) => {
  const [openList, setOpenList] = useState(true);

  const handleOpenList = () => {
    setOpenList(!openList);
  };

  return (
    <div className="taskLayout__field">
      <div className="taskLayout__heading" onClick={handleOpenList}>
        <h1>
          {title}{" "}
          <span style={{ fontSize: "14px", marginLeft: "8px", color: "gray" }}>
            {list.length}
          </span>{" "}
        </h1>
        {openList ? <BiSolidUpArrow /> : <BiSolidDownArrow />}
      </div>
      <div className="taskLayout__innerBox">
        {openList &&
          (list?.length === 0 ? (
            <h1 style={{ fontSize: "18px", marginLeft: "8px", color: "gray" }}>
              list is empty ....
            </h1>
          ) : (
            list?.map((task) => (
              <div key={task.id} className="taskLayout__task">
                <div className="taskLayout__content">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <FaDotCircle />
                    <div style={{ width: "280px" }}>
                      <h3>{task.text}</h3>
                      <p style={{ fontSize: "14px", color: "#787a8d" }}>
                        {task.technologies.join(", ")}
                      </p>
                    </div>
                  </div>
                  <MdDeleteForever
                    className="taskLayout__delButton"
                    onClick={() => handleDel(task.id)}
                  />
                </div>
              </div>
            ))
          ))}
      </div>
    </div>
  );
};

export default TaskLayout;
