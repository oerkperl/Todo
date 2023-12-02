import Todo from "../components/Todo";
import { useState } from "react";
import { uid } from "uid";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";
import {
  Subtask,
  BlueButton,
  Row,
  RoundButton,
  Col,
  StyledLink,
  RowContainer,
  StyledInput,
} from "../components/Styled";

function Task() {
  const { id } = useParams();
  const { getTodo, removeTodo, completeSubTask, updateTodo } =
    useContext(TodoContext);

  const todo = getTodo(id);
  const navigate = useNavigate();
  const [subTask, setSubTask] = useState("");

  const handleRemove = () => {
    removeTodo(todo);
    navigate("/");
  };

  const addSubtask = (task) => {
    if (!task) return;
    const newSubTask = {
      name: task,
      id: uid(),
      isSubTaskCompleted: false,
    };
    const newSubTasks = [...todo.subTasks, newSubTask];
    const updatedTodo = { ...todo, subTasks: newSubTasks };
    updateTodo(updatedTodo);
    setSubTask("");
  };

  if (!todo) return <div>No todo found</div>;

  return (
    <div>
      <Row style={{ alignItems: "center" }}>
        <Col $width="33%">
          <StyledLink to={"/"}>
            <RoundButton>
              <i className="fa-solid fa-arrow-left-long"></i>
            </RoundButton>
          </StyledLink>
        </Col>
        <Col $width="33%">
          <h3>Task Detail</h3>
        </Col>
      </Row>

      <Todo todo={todo} />

      {todo.subTasks.length > 0 && (
        <div>
          <h4 style={{ marginTop: ".5rem" }}>Checklist for subtask</h4>
          <ol>
            {todo.subTasks.map((subTask) => (
              <Subtask
                key={subTask.id}
                style={{
                  textDecoration: subTask.isSubTaskCompleted
                    ? "line-through"
                    : "",
                }}
              >
                <h5>{subTask.name}</h5>
                <button
                  type="button"
                  onClick={() => completeSubTask(todo, subTask.id)}
                >
                  <i className="fa-solid fa-check"></i>
                </button>
              </Subtask>
            ))}
          </ol>
        </div>
      )}

      <RowContainer style={{ marginTop: ".5rem" }}>
        <StyledInput
          type="text"
          placeholder="Add Subtask..."
          value={subTask}
          onChange={(e) => setSubTask(e.target.value)}
          $width="90%"
        />
        <RoundButton type="button" onClickCapture={() => addSubtask(subTask)}>
          <i className="fa-solid fa-check"></i>
        </RoundButton>
      </RowContainer>
      <BlueButton $backgroundColor="lightpink" onClick={handleRemove}>
        <i className="fa-solid fa-trash-can"></i> Delete Task
      </BlueButton>
    </div>
  );
}

export default Task;
