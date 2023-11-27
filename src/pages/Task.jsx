import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";

function Todo() {
  const { id } = useParams();
  const { completeTodo, getTodo } = useContext(TodoContext);
  const todo = getTodo(id);

  if (!todo) return <div>No todo found</div>;

  return (
    <div>
      <h1>{todo.name}</h1>
      <p>{todo.isCompleted ? "Completed" : "Incomplete"}</p>
      <button onClick={() => completeTodo(todo)}>Complete</button>
      <Link to={`/edit/${id}`}>
      <button>Edit</button>
      </Link>
    </div>
  );
}

export default Todo;
