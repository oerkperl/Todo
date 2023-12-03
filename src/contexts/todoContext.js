import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const saveChanges = (arr) => {
    localStorage.setItem("todos", JSON.stringify(arr));
    setTodos(arr);
  };

  const addTodo = (task) => {
    const newTodos = [...todos, task];
    saveChanges(newTodos);
  };

  const updateTodo = (task) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === task.id) {
        todo = task;
      }
      return todo;
    });
    saveChanges(editedTodos);
  };

  const UpdateName = (todo, newName) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, name: newName } : t
    );
    saveChanges(filtered);
  };

  const completeTodo = (todo) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    saveChanges(filtered);
  };

  const removeTodo = (todo) => {
    const filtered = todos.filter((t) => t.id !== todo.id);
    saveChanges(filtered);
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  const completeSubTask = (todo, id) => {
    todo.subTasks.map((subTask) => {
      if (subTask.id === id) {
        subTask.isSubTaskCompleted = !subTask.isSubTaskCompleted;
      }
    });
    updateTodo(todo);
  };

  const getTodos = () => {
    return [...todos];
  };

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const todosArray = JSON.parse(todosString);
      setTodos(todosArray);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        completeTodo,
        removeTodo,
        getTodo,
        updateTodo,
        completeSubTask,
        UpdateName,
        getTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
