import React from "react";
import "../App.css";
import { FaDotCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const DoneList = ({ list, handleDel }) => {
  return (
    <div className="taskLayout__page">
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
          }}
        >
          <h1>Done List</h1>
          <Link to="/home">
            <button
              style={{
                backgroundColor: "#4CAF50",
                padding: "5px 10px",
                border: "none",
                borderRadius: "10px",
                color: "#ffff",
              }}
            >
              Back
            </button>
          </Link>
        </div>
        <div className="taskLayout__innerBox">
          {list.length == 0 ? (
            <h2>Donelist is empty Add some</h2>
          ) : (
            list.map((task) => (
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
                      <p>{task.technologies.join(", ")}</p>
                    </div>
                  </div>
                  {/* <MdDeleteForever style={{ fontSize: "20px" }} onClick={() => handleDel(task.id)} /> */}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default DoneList;
