import React, { createContext, useState, ReactNode } from 'react';
import NotificationModal from '../components/NotificationModal ';
import { TodoContextValue, ITodo } from '../@types.todo';

export const TodoContext = createContext<TodoContextValue | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  function useLocalState<T>(key: string, initialValue: T) {
    const storedValue = window.localStorage.getItem(key);
    const item = storedValue ? JSON.parse(storedValue) : initialValue;
    const [state, setState] = useState<T>(item);

    const updateState = (value: T) => {
      window.localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    };

    return [state, updateState] as const;
  }

  const [todos, setTodos] = useLocalState<ITodo[]>('todos', []);
  const [sortOrder, setSortOrder] = useState<string>('Default');
  const [sortCondition, setSortCondition] = useState<string>('priority');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  

  function useNotification(notification: string) {
    return (
      showNotification && (
        <NotificationModal
        message={notification}
        onClose={handleCloseNotification}
      />
      )
    );
  }
  const handleShowNotification = () => {
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const sort = (arr:ITodo[], sortBy:string, orderBy:string) => {
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

  const addTodo = (task: ITodo) => {
    setTodos([...todos, task]);
  };

  const updateTodo = (task: ITodo) => {
    const editedTodos = todos.map((todo) => {
      if (todo.id === task.id) {
        return task;
      }
      return todo;
    });
    setTodos(editedTodos);
  };

  const UpdateName = (todo: ITodo, newName: string) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, name: newName } : t
    );
    setTodos(filtered);
  };

  const completeTodo = (todo: ITodo) => {
    const filtered = todos.map((t) =>
      t.id === todo.id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(filtered);
  };

  const removeTodo = (todo: ITodo) => {
    const filtered = todos.filter((t) => t.id !== todo.id);
    setTodos(filtered);
  };

  const getTodo = (id: number) => {
    return todos.find((todo) => todo.id === id);
  };

  const completeSubTask = (todo: ITodo, id: number) => {
    todo.subTasks?.forEach((subTask) => {
      if (subTask.id === id) {
        subTask.isSubTaskCompleted = !subTask.isSubTaskCompleted;
      }
    });
    updateTodo(todo);
};
  
 const val: TodoContextValue = {
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
    handleShowNotification,
    handleCloseNotification,
    setShowNotification,
    useNotification,
    showNotification,
    sortOrder,
    sortCondition,
    todos,
  };

  
  return <TodoContext.Provider value={val}>{children}</TodoContext.Provider>
};
export default TodoProvider;