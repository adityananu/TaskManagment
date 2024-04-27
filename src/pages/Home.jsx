import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import TaskLayout from "../components/TaskLayout";
import Header from "../components/Header";
import SideBar from "../components/SideBar";

const Home = ({
  tasksList,
  setTasksList,
  todoList,
  progressList,
  doneList,
  user,
  signOut,
  auth,
}) => {
  const [inputText, setInputText] = useState("");
  const [selectedOption, setSelectedOption] = useState("todo");
  const [showSideBar, setShowSideBar] = useState(false);
  const [selectedTechnologies, setSelectedTechnologies] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim() === "") {
      alert("Please Enter Text");
      return;
    }

    setTasksList([
      ...tasksList,
      {
        id: uuidv4(),
        text: inputText,
        selectedField: selectedOption,
        technologies: selectedTechnologies,
      },
    ]);

    setInputText("");
    setSelectedOption("todo");
    setSelectedTechnologies([]);
  };

  const handleDel = (delId) => {
    const newTaskList = tasksList.filter((task) => task.id !== delId);
    setTasksList(newTaskList);
  };

  const handlebutton = (technology) => {
    if (selectedTechnologies.includes(technology)) {
      const newTechnologies = selectedTechnologies.filter(
        (tech) => tech !== technology
      );
      setSelectedTechnologies(newTechnologies);
    } else {
      setSelectedTechnologies([...selectedTechnologies, technology]);
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    navigate("/");
  };

  const handleSideBarClose = () => {
    setShowSideBar(false);
  };

  const handleSideBarOpen = () => {
    setShowSideBar(true);
  };

  return (
    <>
      <Header
        user={user.email}
        handleSignOut={handleSignOut}
        showSideBar={handleSideBarOpen}
        closeSideBar={handleSideBarClose}
      />
      <main className="taskmanagment__box">
        {showSideBar && (
          <div className="sidebar__box">
            <SideBar showSideBar={handleSideBarClose} />
          </div>
        )}
        <form onSubmit={handleSubmit} className="taskmanagment__boxtop">
          <div className="boxtop__input">
            <input
              type="text"
              value={inputText}
              placeholder="Enter Text Here..."
              onChange={(e) => setInputText(e.target.value)}
            />
            <input type="submit" value="Add" />
          </div>
          <div className="boxtop__buttons">
            <div className="inner__buttons">
              <button
                type="button"
                onClick={() => handlebutton("react")}
                className={
                  selectedTechnologies.includes("react")
                    ? "selected"
                    : "selectButton"
                }
              >
                React
              </button>
              <button
                type="button"
                onClick={() => handlebutton("javascript")}
                className={
                  selectedTechnologies.includes("javascript")
                    ? "selected"
                    : "selectButton"
                }
              >
                Javascript
              </button>
              <button
                type="button"
                onClick={() => handlebutton("mongodb")}
                className={
                  selectedTechnologies.includes("mongodb")
                    ? "selected"
                    : "selectButton"
                }
              >
                MongoDB
              </button>
              <button
                type="button"
                onClick={() => handlebutton("express")}
                className={
                  selectedTechnologies.includes("express")
                    ? "selected"
                    : "selectButton"
                }
              >
                Express
              </button>
            </div>
            <select
              className="options"
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="progress">Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </form>
        <section className="taskLayout__box">
          <TaskLayout
            title="Todo"
            list={todoList}
            handleDel={handleDel}
            linkTo="/todolist"
          />
          <TaskLayout
            title="Progress"
            list={progressList}
            handleDel={handleDel}
            linkTo="/progresslist"
          />
          <TaskLayout
            title="Done"
            list={doneList}
            handleDel={handleDel}
            linkTo="/donelist"
          />
        </section>
      </main>
    </>
  );
};

export default Home;
