import Todo from "../components/Todo";
import  Header from "../components/Header";
import { useState } from "react";
import { uid } from "uid";
import { useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TodoContext } from "../contexts/todoContext";

import {
  Subtask,
  BlueButton,
  RoundButton,
  RowContainer,
  StyledInput,
} from "../components/Styled";


function TaskDetail() {
  const { id }:any = useParams();
  const {
    getTodo,
    removeTodo,
    completeSubTask,
    updateTodo,
    handleShowNotification,
    setShowNotification,
    useNotification,
  } = useContext(TodoContext);

  const todo = getTodo(id);
  const navigate = useNavigate();
  const [subTask, setSubTask] = useState("");

  const handleRemove = () => {
    removeTodo(todo);
    handleShowNotification();
    setTimeout(() => {
      setShowNotification(false);
      navigate("/");
    }, 2000);
  };

  const addSubtask = (task) => {
    if (!task) return;
    const newSubTask = {
      name: task,
      id: uid(),
      isSubTaskCompleted: false,
    };
    const newSubTasks = [...todo.subTasks, newSubTask];
    const updatedTodo:any= { ...todo, subTasks: newSubTasks };
    updateTodo(updatedTodo);
    setSubTask("");
  };
  const notificationComponent = useNotification("Task Deleted...");

  return (
    <>
      {todo ? (
        <div>
          <Header title={"Task Detail"} />

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
            <RoundButton
              type="button"
              onClickCapture={() => addSubtask(subTask)}
            >
              <i className="fa-solid fa-plus"></i>
            </RoundButton>
          </RowContainer>
          <BlueButton $backgroundColor="lightpink" onClick={handleRemove}>
            <i className="fa-solid fa-trash-can"></i> Delete Task
          </BlueButton>
        </div>
      ) : (
        notificationComponent
      )}
    </>
  );
}

export default TaskDetail;
