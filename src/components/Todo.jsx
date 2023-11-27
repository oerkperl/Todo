import { useContext } from "react";
import { Link } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useContext(TodoContext);
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <Link to={`/task/${todo.id}`}>{todo.text}</Link>
      <div>
        <button onClick={() => completeTodo(todo)}>Complete</button>
        <button onClick={() => removeTodo(todo)}>x</button>
        <Link to={`/edit/${todo.id}`}>
      <button>Edit</button>
      </Link>
      </div>
    </div>
  );
}

export default Todo;
