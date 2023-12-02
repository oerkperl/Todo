import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (task) => {
    const newTodos = [...todos, task];
    localStorage.setItem("todos", JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const updateTodo = (task) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === task.id) {
        todo = task;
      }
      return todo;
    });
    localStorage.setItem("todos", JSON.stringify(editedTodos));
    setTodos(editedTodos);
  };

  const UpdateName = (todo, newName) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, name: newName } : t
    );
    localStorage.setItem("todos", JSON.stringify(filtered));
    setTodos(filtered);
  };

  const completeTodo = (todo) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    localStorage.setItem("todos", JSON.stringify(filtered));
    setTodos(filtered);
  };

  const removeTodo = (todo) => {
    const filtered = todos.filter((t) => t.id !== todo.id);
    localStorage.setItem("todos", JSON.stringify(filtered));
    setTodos(filtered);
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
