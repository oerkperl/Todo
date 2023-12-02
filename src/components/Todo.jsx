import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";
import {
  TodoCard,
  CardRow,
  CardHeader,
  LevelIcon,
  StyledInput,
} from "./Styled";

function Todo({ todo }) {
  const { completeTodo, UpdateName } = useContext(TodoContext);
  const [taskName, setTaskName] = useState(todo.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateName(todo, taskName);
    setIsEditingName((prev) => !prev);
  };

  return (
    <div className="todo">
      <TodoCard style={{ backgroundColor: todo.isCompleted ? "#d3eddb" : "" }}>
        <div>
          <CardHeader $top="0">
            <LevelIcon $priority={todo.priorityLevel} />
            {!isEditingName && (
              <h4
                onClick={() => {
                  setIsEditingName((prev) => !prev);
                }}
              >
                {todo.name}
              </h4>
            )}

            {isEditingName && (
              <form onSubmit={handleSubmit}>
                <StyledInput
                  type="text"
                  className="input"
                  value={taskName}
                  onChange={(e) => setTaskName(e.target.value)}
                />
                <button style={{ marginLeft: ".5rem" }} onClick={handleSubmit}>
                  <i className="fa-regular fa-circle-check"></i>
                </button>
              </form>
            )}

            <Link to={`/edit/${todo.id}`}>
              <button>
                <i className="fa-solid fa-pen"></i>
              </button>
            </Link>
            <button onClick={() => completeTodo(todo)}>
              <i className="fa-solid fa-check"></i>
            </button>
          </CardHeader>
        </div>

        <div
          onClick={() => navigate(`/task/${todo.id}`)}
          style={{ cursor: "pointer" }}
        >
          <CardRow>
            <i className="fa-regular fa-calendar"></i>
            <label>Due Date:</label>
            {todo.hour + ":" + todo.minute + " " + todo.period}
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
