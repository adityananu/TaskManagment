import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TodoList from "./pages/todoList";
import UserLoginSignup from "./pages/UserLoginSignup";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebase";
import ProgressList from "./pages/ProgressList";
import DoneList from "./pages/DoneList";

const App = () => {
  const [tasksList, setTasksList] = useState(() => {
    const data = localStorage.getItem("tasks");
    return data ? JSON.parse(data) : [];
  });
  const [todoList, setTodoList] = useState([]);
  const [progressList, setProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) =>
      setUser(currentUser)
    );
    return () => {
      unSubscribe();
    };
  }, [auth]);

  const fileterTodoList = () => {
    const filteredTodoListData = tasksList.filter(
      (task) => task.selectedField.toLowerCase() === "todo"
    );
    setTodoList(filteredTodoListData);
  };

  const filteredProgressList = () => {
    const filteredProgessListData = tasksList.filter(
      (task) => task.selectedField.toLowerCase() === "progress"
    );
    setProgressList(filteredProgessListData);
  };

  const filteredDoneList = () => {
    const filteredDoneListData = tasksList.filter(
      (task) => task.selectedField.toLowerCase() === "done"
    );
    setDoneList(filteredDoneListData);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
    fileterTodoList();
    filteredProgressList();
    filteredDoneList();
  }, [tasksList]);

  return (
    <BrowserRouter>
      <Routes>
        {user && (
          <>
            <Route
              path="/home"
              element={
                <Home
                  tasksList={tasksList}
                  setTasksList={setTasksList}
                  todoList={todoList}
                  progressList={progressList}
                  doneList={doneList}
                  user={user}
                  onAuthStateChanged={onAuthStateChanged}
                  signOut={signOut}
                  auth={auth}
                />
              }
            />
            <Route path="/todoList" element={<TodoList list={todoList} />} />
            <Route
              path="/progressList"
              element={<ProgressList list={progressList} />}
            />
            <Route path="/doneList" element={<DoneList list={doneList} />} />
          </>
        )}
        <Route path="/" element={<UserLoginSignup auth={auth} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
