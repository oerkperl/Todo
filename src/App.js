import React from "react";
import TasksList from "./pages/TasksList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TaskDetail from "./pages/TaskDetail";
import { TodoProvider } from "./contexts/todoContext";
import { AddEditTask } from "./pages/AddEditTask";
import { GlobalStyle, Wrapper } from "./components/Styled";

function App() {
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Router>
          <TodoProvider>
            <Routes>
              <Route exact path="/" element={<TasksList />} />
              <Route exact path="/add" element={<AddEditTask />} />
              <Route exact path="/edit/:id" element={<AddEditTask />} />
              <Route path="/task/:id" element={<TaskDetail />} />
            </Routes>
          </TodoProvider>
        </Router>
      </Wrapper>
    </>
  );
}

export default App;
