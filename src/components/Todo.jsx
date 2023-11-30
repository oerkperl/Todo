import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";
import { TodoCard, CardRow, CardButtons, LevelIcon } from "./Styled";

function Todo({ todo }) {
  const { completeTodo, removeTodo } = useContext(TodoContext);
  const navigate = useNavigate();
  console.log();
  return (
    <div
      className="todo"
      style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}
    >
      <TodoCard style={{ cursor: "pointer" }}>
        <CardButtons $top="0">
          <Link to={`/edit/${todo.id}`}>
            <button>
              <i className="fa-solid fa-pen"></i>
            </button>
          </Link>
          <button onClick={() => completeTodo(todo)}>
            <i className="fa-solid fa-check"></i>
          </button>
        </CardButtons>
        <div onClick={() => navigate(`/task/${todo.id}`)}>
          <CardRow>
            <LevelIcon $priority={todo.priorityLevel} />
            <h4>{todo.name}</h4>
          </CardRow>
          <CardRow>
            <i className="fa-regular fa-calendar"></i>
            <label>Due Date:</label>
          </CardRow>
          <CardRow>
            <i className="fa-solid fa-arrow-up-long"></i>
            <label>Priority:</label>
            {`${todo.priorityLevel} ( ${todo.priority}/10)`}
          </CardRow>
          <CardRow>
            <i className="fa-solid fa-arrows-up-down-left-right"></i>
            <label>Complexity:</label>
            {`${todo.complexityLevel} ( ${todo.complexity}/10)`}
          </CardRow>
          <CardRow>
            <i className="fa-solid fa-tags"></i>
            <label>Tags:</label>
            {todo.tags}
          </CardRow>
        </div>
      </TodoCard>
    </div>
  );
}

export default Todo;
