import { useState, useContext,useEffect } from "react";
import { TodoContext } from "../contexts/todoContext";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate, useParams } from "react-router-dom";

function TodoForm() {

  const [value, setValue] = useState("");
  const { addTodo } = useContext(TodoContext);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isEditing, setIsEditing]= useState(false)
  const navigate = useNavigate()
  const { id } = useParams();
  const { editTodo, getTodo } = useContext(TodoContext);

  useEffect(() => {
    if (id) {
      setIsEditing(true)
    }
  }, [id])

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
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
    setValue(todo.text);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!value) return;
    
    if (isEditing) {
      editTodo(value,id)
      setIsEditing(false)
    } else {
      addTodo(value);
    }
    
    setValue("");
    navigate('/')
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <h5>Select a Date</h5>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat="dd/MM/yyyy"
      />
      
      <button type="submit">
        Save Task 
      </button>

    </form>
  );
}

export default TodoForm;
