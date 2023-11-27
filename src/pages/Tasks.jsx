
import Todo from "../components/Todo";
import { useContext } from "react";


import { TodoContext } from "../contexts/todoContext";
import { Link } from "react-router-dom";
import { BlueButton, Center } from "../components/Styled";

const Todos = () => {
  const { todos } = useContext(TodoContext);
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <Todo key={todo.id} todo={todo} />
      ))}
      <Center>
      <Link to={'/add'}>
        <BlueButton>Add New Task</BlueButton>
      </Link>
      </Center>
    </div>
  );
};

export default Todos;
