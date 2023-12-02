import React from "react";
import Tasks from "./pages/Tasks";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoDetail from "./pages/Task";
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
              <Route exact path="/" element={<Tasks />} />
              <Route exact path="/add" element={<AddEditTask />} />
              <Route exact path="/edit/:id" element={<AddEditTask />} />
              <Route path="/task/:id" element={<TodoDetail />} />
            </Routes>
          </TodoProvider>
        </Router>
      </Wrapper>
    </>
  );
}

export default App;
