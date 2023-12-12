import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";
import {
  TodoCard,
  CardRow,
  CardHeader,
  LevelIcon,
  StyledInput,
} from "./Styled";

interface TodoProps {
  todo: any;
}

const Todo: React.FC<TodoProps> = ({ todo }) => {
  const { completeTodo, UpdateName } = useContext(TodoContext);
  const [taskName, setTaskName] = useState<string>(todo.name);
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [dueDate, setDueDate] = useState<string | null>("");
  const [daysDifference, setDaysDifference] = useState<number | null>(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    UpdateName(todo, taskName);
    setIsEditingName((prev) => !prev);
  };

  useEffect(() => {
    const displaydate =
      todo.date === undefined || todo.date === null
        ? "Not specified"
        : todo.date + ", " + todo.hour + ":" + todo.minute + " " + todo.period;
    setDueDate(displaydate);
    setDaysDifference(calcDaysDifference(todo?.date));
  }, []);

  function calcDaysDifference(inputDate:string | null | undefined) {
    if (inputDate === null || inputDate === undefined) {
      return void 0;
    }
    const [day, month, year] = inputDate.split("/").map(Number);
    const inputDateObj:any = new Date(year, month - 1, day);
    const currentDate:any = new Date();
    const timeDifference = inputDateObj - currentDate;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return daysDifference;
  }

  return (
    <div
      className="todo"
      style={{
        textDecoration: todo.isCompleted ? "line-through" : "",
      }}
    >
      <TodoCard style={{ backgroundColor: todo.isCompleted ? "#d3eddb" : "" }}>
        <div>
          <CardHeader $top="0">
            <LevelIcon $priority={daysDifference} />
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
            {dueDate}
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
            {todo.tags === "" ? "None" : todo.tags}
          </CardRow>
        </div>
      </TodoCard>
    </div>
  );
}

export default Todo;
