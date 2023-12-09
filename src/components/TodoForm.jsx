import "react-datepicker/dist/react-datepicker.css";
import { uid } from "uid";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";
import { useParams, useNavigate } from "react-router-dom";
import { Header } from "../components/Header";

import {
  Center,
  BlueButton,
  StyledInput,
  StyledDatePicker,
  RoundButton,
  ButtonContainer,
  Row,
  Col,
  StyledForm,
  RowContainer,
  Dropdown,
  Subtask,
} from "./Styled";

function TodoForm() {
  const {
    updateTodo,
    getTodo,
    addTodo,
    handleShowNotification,
    setShowNotification,
    useNotification,
  } = useContext(TodoContext);

  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(1);
  const [selectedcomplexity, setSelectedComplexity] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [subTask, setSubTask] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("AM");
  const [selectedHour, setSelectedHour] = useState(1);
  const [selectedMinute, setSelectedMinute] = useState("00");

  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const hours = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const minutes = ["00", "10", "20", "30", "40", "50", "60"];
  const periods = ["AM", "PM"];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsEditing(true);
        try {
          const todo = await getTodo(id);
          if (todo) {
            initializeEdit(todo);
          }
        } catch (error) {
          console.error("Error fetching todo:", error);
        }
      }
    };

    fetchData();
  }, [id, getTodo]);

  const setLevel = (number) => {
    let level;
    if (number > 0 && number < 4) {
      level = "Low";
    } else if (number >= 4 && number < 7) {
      level = "Moderate";
    } else if (number >= 7) {
      level = "High";
    } else {
      level = "Unknown";
    }
    return level;
  };

  const initializeEdit = (todo) => {
    setName(todo.name);
    setSelectedComplexity(todo.complexity);
    setSelectedPriority(todo.priority);
    setTags(todo.tags);
    setIsCompleted(todo.isCompleted);
    setSubTasks(todo.subTasks);
    setSelectedHour(todo.hour);
    setSelectedMinute(todo.minute);
    setSelectedPeriod(todo.period);
  };

  const formatDate = (d) => {
    if (d === null || d === undefined) {
      return getTodo(id)?.date;
    } else {
      const yyyy = d?.getFullYear();
      let mm = d?.getMonth() + 1;
      let dd = d?.getDate();
      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;
      const formatted = dd + "/" + mm + "/" + yyyy;
      return formatted;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const task = getFormData();
    if (isEditing) {
      updateTodo(task);
      setIsEditing(false);
    } else {
      addTodo(task);
    }
    clearForm();
    handleShowNotification();
    setTimeout(() => {
      setShowNotification(false);
      navigate(-1) || navigate("/");
    }, 2000);
  };

  const getFormData = () => {
    const taskId = isEditing ? id : uid();
    const data = {
      name: name,
      priority: selectedPriority,
      priorityLevel: setLevel(selectedPriority),
      complexity: selectedcomplexity,
      complexityLevel: setLevel(selectedcomplexity),
      date: formatDate(selectedDate),
      tags: tags,
      id: taskId,
      isCompleted: isCompleted,
      subTasks: subTasks,
      hour: selectedHour,
      minute: selectedMinute,
      period: selectedPeriod,
    };
    return data;
  };

  const clearForm = () => {
    setName("");
    setTags("");
  };

  const addSubtask = (task) => {
    if (!task) return;
    const newSubTask = {
      name: task,
      id: uid(),
      isSubTaskCompleted: false,
    };
    setSubTasks((prev) => [...prev, newSubTask]);
    setSubTask("");
  };

  const deleteSubtask = (id) => {
    setSubTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const notification = isEditing ? "Changes Saved" : "New task added";

  return (
    <StyledForm onSubmit={handleSubmit}>
      <div>{useNotification(notification)}</div>
      <Header title={isEditing ? "Edit Task" : "Add Task"} />
      <h4>Task Name</h4>
      <Row>
        <StyledInput
          type="text"
          className="input"
          value={name}
          onChange={(e) => setName(e.target.value)}
          $width="100%"
        />
      </Row>
      <h4>Select Priority</h4>
      <ButtonContainer>
        {options.map((option) => (
          <RoundButton
            key={option}
            onClick={() => setSelectedPriority(option)}
            $isSelected={selectedPriority === option}
            type="button"
          >
            {option}
          </RoundButton>
        ))}
      </ButtonContainer>
      <h4>Select Complexity</h4>
      <ButtonContainer>
        {options.map((option) => (
          <RoundButton
            key={option}
            onClick={() => setSelectedComplexity(option)}
            $isSelected={selectedcomplexity === option}
            type="button"
          >
            {option}
          </RoundButton>
        ))}
      </ButtonContainer>
      <Row>
        <Col $width="50%">
          <h4>Select a Date</h4>
          <StyledDatePicker
            selected={selectedDate}
            onChange={(e) => setSelectedDate(e)}
            dateFormat="dd/MM/yyyy"
            placeholderText={getTodo(id)?.date || "dd.mm.yyyy"}
          />
        </Col>
        <Col $width="50%">
          <h4>Select a Time</h4>
          <Row
            style={{
              justifyContent: "space-between",
            }}
          >
            <Dropdown
              value={selectedHour}
              onChange={(e) => setSelectedHour(parseInt(e.target.value, 10))}
            >
              {hours.map((hour) => (
                <option key={hour} value={hour}>
                  {hour}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              value={selectedMinute}
              onChange={(e) => setSelectedMinute(e.target.value)}
            >
              {minutes.map((minute) => (
                <option key={minute} value={minute}>
                  {minute}
                </option>
              ))}
            </Dropdown>
            <Dropdown
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              {periods.map((period) => (
                <option key={period} value={period}>
                  {period}
                </option>
              ))}
            </Dropdown>
          </Row>
        </Col>
      </Row>

      <h4>Add Checklist for subtask</h4>

      <RowContainer>
        <StyledInput
          type="text"
          placeholder="Add Subtask..."
          value={subTask}
          onChange={(e) => setSubTask(e.target.value)}
          $width="90%"
        />
        <RoundButton type="button" onClickCapture={() => addSubtask(subTask)}>
          <i className="fa-solid fa-plus"></i>
        </RoundButton>
      </RowContainer>

      <ol>
        {subTasks.map((subTask) => (
          <Subtask key={subTask.id}>
            <h5>{subTask.name}</h5>
            <button type="button" onClick={() => deleteSubtask(subTask.id)}>
              <i className="fa-solid fa-trash-can"></i>
            </button>
          </Subtask>
        ))}
      </ol>
      <h4>Add Tags</h4>
      <Row>
        <StyledInput
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          $width="100%"
        />
      </Row>

      <Center>
        <BlueButton type="submit" $backgroundColor="#3498db" $color="#fff">
          Save Task{" "}
        </BlueButton>
      </Center>
    </StyledForm>
  );
}

export default TodoForm;
