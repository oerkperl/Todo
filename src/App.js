import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
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
          {/* <nav>
            <Link to="/">
              <i className="fa-solid fa-house-chimney"></i>
            </Link>
          </nav> */}

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
