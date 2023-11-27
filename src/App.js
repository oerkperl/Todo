import React from "react";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Tasks from "./pages/Tasks";
import TodoDetail from "./pages/Task";
import { TodoProvider } from "./contexts/todoContext";
import { AddEditTask } from "./pages/AddEditTask";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <TodoProvider>
        <Routes>
          <Route exact path="/" element={<Tasks />} />
          <Route exact path="/add" element={<AddEditTask />} />
          <Route exact path="/edit/:id" element={<AddEditTask />} />
          <Route path="/task/:id" element={<TodoDetail />} />
        </Routes>
      </TodoProvider>
    </Router>
  );
}

export default App;
