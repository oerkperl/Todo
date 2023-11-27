
import { uid } from "uid";
import { useState, useContext, useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from "react-router-dom";
import { Center, BlueButton, LargInput, StyledDatePicker, Wrapper,RoundButton, ButtonContainer } from "./Styled";


function TodoForm() {

  const [name, setName] = useState("");
  const [tags, setTags] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [selectedcomplexity, setSelectedComplexity] = useState(null);
  const [subTask, setSubTask]= useState(['sub1', 'subs'])
  const navigate = useNavigate()
  const { id } = useParams();
  const { editTodo, getTodo, addTodo } = useContext(TodoContext);
  const priority = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const complexity = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
 

  
  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setIsEditing(true)
        try {
          const todo = await getTodo(id);
          if (todo) {
            //console.log(todo)
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
    setSelectedDate(todo.date)
    setTags(todo.tags)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) return;
    const task = getFormData()
    if (isEditing) {
      editTodo(task, id)
      setIsEditing(false)
    } else {
     
      
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
      id:taskId,
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

  const handlePriority = (priority) => {
    setSelectedPriority(priority)
    console.log(`Priority: ${priority} `);
  };

  const handleComplexity = (complexity) => {
    setSelectedComplexity(complexity)
    console.log(`Complexity: ${complexity}`);
  };


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
      {priority.map((option) => (
        <RoundButton
          key={option}
          onClick={() => handlePriority(option)}
          type="button"
          
        >
          {option}</RoundButton>
      ))}
    </ButtonContainer>
        <h4>Select Complexity</h4>
        <ButtonContainer>
      {complexity.map((option) => (
        <RoundButton
          key={option}
          onClick={() => handleComplexity(option)}
          type="button"
        >
          {option}</RoundButton>
      ))}
    </ButtonContainer>
      <h4>Select a Date</h4>
      <StyledDatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
        placeholderText="dd.mm.yyyy"
      />
      <h4>Add Checklist for subtask</h4>
      <LargInput
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        />
        <ul>
        {subTask.map((subTask, index) => (
          <li key={index}>{ subTask}</li>
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
