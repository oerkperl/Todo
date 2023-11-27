import { createContext, useState } from "react";
import { useParams } from "react-router-dom";
import { uid } from "uid";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { id } = useParams();
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    const newTodos = [...todos, task];
    setTodos(newTodos);
  };

  const editTodo = (task, id) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo = task;
      }
      return todo;
    });
    setTodos(editedTodos);
  };

  const completeTodo = (todo) => {
    setTodos((todos) =>
      todos.map((t) =>
        t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const removeTodo = (todo) => {
    setTodos((todos) => todos.filter((t) => t.id !== todo.id));
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };
  return (
    <TodoContext.Provider
      value={{ todos, addTodo, completeTodo, removeTodo, getTodo, editTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};
