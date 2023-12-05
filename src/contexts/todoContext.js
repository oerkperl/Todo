import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  function useLocalState(key, initialValue) {
    const storedValue = window.localStorage.getItem(key);
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState(item);

    const updateState = (value) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    };

    return [state, updateState];
  }

  const [todos, setTodos] = useLocalState("todos", []);
  const [sortOrder, setSortOrder] = useState("Default");
  const [sortCondition, setSortCondition] = useState("priority");
  const [sortedTodos, setSortedTodos] = useState([...todos]);

  const sort = (arr, sortBy, orderBy) => {
    if (orderBy === "Default") {
      return arr;
    } else {
      if (sortBy === sortCondition && orderBy === "Ascending") {
        arr.sort((a, b) => a[sortBy] - b[sortBy]);
      } else {
        arr.sort((a, b) => b[sortBy] - a[sortBy]);
      }
    }

    return arr;
  };

  const getTodos = () => {
    const sorted = sort([...todos], sortCondition, sortOrder);
    return sorted;
  };

  const addTodo = (task) => {
    setTodos([...todos, task]);
  };

  const updateTodo = (task) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === task.id) {
        return task;
      }
      return todo;
    });
    setTodos(editedTodos);
  };

  const UpdateName = (todo, newName) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, name: newName } : t
    );
    setTodos(filtered);
  };

  const completeTodo = (todo) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(filtered);
  };

  const removeTodo = (todo) => {
    const filtered = todos.filter((t) => t.id !== todo.id);
    setTodos(filtered);
  };

  const getTodo = (id) => {
    return todos.find((todo) => todo.id === id);
  };

  const completeSubTask = (todo, id) => {
    todo.subTasks.forEach((subTask) => {
      if (subTask.id === id) {
        subTask.isSubTaskCompleted = !subTask.isSubTaskCompleted;
      }
    });
    updateTodo(todo);
  };

  return (
    <TodoContext.Provider
      value={{
        addTodo,
        completeTodo,
        removeTodo,
        getTodo,
        updateTodo,
        completeSubTask,
        UpdateName,
        setSortCondition,
        setSortOrder,
        getTodos,
        sortOrder,
        sortCondition,
        todos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
