
import { uid } from "uid";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from "react-router-dom";
import {
  Center,
  BlueButton,
  LargInput,
  StyledDatePicker,
  Wrapper,
  RoundButton,
  ButtonContainer,
  Row,
  Col, 
  SmallInput
} from "./Styled";
import TimePicker from 'react-time-picker';

function TodoForm() {

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState(1);
  const [selectedcomplexity, setSelectedComplexity] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSubTaskCompleted, setIsSubTaskCompleted] = useState(false);
  const [subTasks, setSubTasks] = useState([]);
  const [subTask, setSubTask] = useState('')
  const navigate = useNavigate();
  const { id } = useParams();
  const { editTodo, getTodo, addTodo } = useContext(TodoContext);
  const options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsEditing(true)
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
  
  const initializeEdit = (todo) => {
    setName(todo.name);
    setSelectedComplexity(todo.complexity);
    setSelectedPriority(todo.priority);
    setSelectedDate(todo.date);
    setTags(todo.tags);
    setIsCompleted(todo.isCompleted);
    setSubTasks(todo.subTasks);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const task = getFormData()
    if (isEditing) {
      //console.log(task)
      editTodo(task)
      setIsEditing(false)
    } else {  
      //console.log(task)
      addTodo(task);
    }
    clearForm();
    navigate('/')
  };

  const getFormData = () => {
    const taskId = isEditing ? id : uid();
    const data = {
      name: name,
      priority: selectedPriority,
      complexity: selectedcomplexity,
      date: selectedDate,
      tags: tags,
      id: taskId,
      isCompleted: isCompleted,
      subTasks:subTasks,
    }
    return data;
  }

  const clearForm = () => {
    setName('');
    setSelectedComplexity('');
    setSelectedPriority('');
    setSelectedDate('')
    setTags('')
  }

  const addSubtask = (task) => {
    if (!task) return;
    const newSubTask = { name: task, id: uid(), isSubTaskCompleted:isSubTaskCompleted }
    setSubTasks((prev) => [...prev, newSubTask])   
    setSubTask("");
  };

  const deleteSubtask = (id) => {
    setSubTasks((prev) => prev.filter((task) => 
      task.id !== id
    ))
  }


  return (
    
    <Wrapper>
      <form onSubmit={handleSubmit}>
      <Center>
      <h3>Add New Task</h3>
      </Center>
      <h4>Task Name</h4>
      <LargInput
        type="text"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <h4>Select Priority</h4>
      <ButtonContainer>
      {options.map((option) => (
        <RoundButton
          key={option}
          onClick={() =>  setSelectedPriority(option)}
          $isSelected={selectedPriority === option}
          type="button"   
        >
          {option}</RoundButton>
      ))}
    </ButtonContainer>
        <h4>Select Complexity</h4>
        <ButtonContainer>
      {options.map((option) => (
        <RoundButton
          key={option}
          onClick={() =>  setSelectedComplexity(option)}
          $isSelected={selectedcomplexity === option}
          type="button"   
        >
          {option}</RoundButton>
      ))}
        </ButtonContainer>
        <Row>
          
        <Col $width='50%'>
            <h4>Select a Date</h4>
            <StyledDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd.mm.yyyy"
            />
          </Col>
          <Col $width='50%'>
            <h4>Select a Time</h4>
            <StyledDatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="dd/MM/yyyy"
              placeholderText="dd.mm.yyyy"
            />
          </Col>
          
        </Row>
      
        <h4>Add Checklist for subtask</h4>
        <Row>
        
          <Col $width='100%'>
          <SmallInput
        type="text"
        value={subTask}
        onChange={(e) => setSubTask(e.target.value)}
          />
          </Col>
          <Col $width='10%'>
            <RoundButton type="button" onClickCapture={() => addSubtask(subTask)}>+</RoundButton>
          </Col>
        </Row>
      
        <ul>
        {subTasks.map((subTask) => (
          <li key={subTask.id}>{subTask.name}
            <RoundButton onClick={()=>deleteSubtask(subTask.id)}>X</RoundButton>
          </li>
          ))}
        </ul>
        <h4>Add Tags</h4>
      <LargInput
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      
        <Center>
          <BlueButton type="submit">Save Task </BlueButton>
        </Center>

    </form>
    </Wrapper>
   
  );
}

export default TodoForm;
