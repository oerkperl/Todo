import { useContext } from "react";
import Todo from "../components/Todo";

import { TodoContext } from "../contexts/todoContext";
import { Link } from "react-router-dom";

const Todos = () => {
  const { todos } = useContext(TodoContext);
  return (
    <div className="todo-list">
      <Link to={'/add'}>
        <button>Add New Task</button>
      </Link>
      
      
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default Todos;
