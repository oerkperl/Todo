import { useContext, useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";
import {
  TodoCard,
  CardRow,
  Subtask,
  BlueButton,
  CardButtons,
  LevelIcon,
  Row,
  RoundButton,
  Col,
  StyledLink,
} from "../components/Styled";

function Todo() {
  const { id } = useParams();
  const { completeTodo, getTodo, removeTodo, completeSubTask } =
    useContext(TodoContext);

  const todo = getTodo(id);
  const navigate = useNavigate();

  const handleRemove = () => {
    removeTodo(todo);
    navigate("/");
  };

  useEffect(() => {}, [todo.isSubTaskCompleted]);

  if (!todo) return <div>No todo found</div>;

  return (
    <div style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
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
      <TodoCard>
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
        <CardButtons $top="50%"></CardButtons>

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
      </TodoCard>
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
      <BlueButton $backgroundColor="lightpink" onClick={handleRemove}>
        <i className="fa-solid fa-trash-can"></i> Delete Task
      </BlueButton>
    </div>
  );
}

export default Todo;
