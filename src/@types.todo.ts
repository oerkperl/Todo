
import { Dispatch, SetStateAction } from 'react';
export interface Todo {
    id: number;
    name: string;
    isCompleted?: boolean;
    subTasks?: Array<{ id: number; name: string; isSubTaskCompleted: boolean }>;
    priority: string;
    priorityLevel: number;
    complexity: string;
    complexityLevel: number;
    date: string;
    tags: string;
    hour: number;
    minute: string;
    period: string;
  
  }
  
  export interface TodoContextValue {
    addTodo: (task: Todo) => void;
    completeTodo: (todo: Todo) => void;
    removeTodo: (todo: Todo) => void;
    getTodo: (id: number) => Todo | undefined;
    updateTodo: (task: Todo) => void;
    completeSubTask: (todo: Todo, id: number) => void;
    UpdateName: (todo: Todo, newName: string) => void;
    setSortCondition: Dispatch<SetStateAction<string>>;
    setSortOrder: Dispatch<SetStateAction<string>>;
    getTodos: () => Todo[];
    handleShowNotification: () => void;
    handleCloseNotification: () => void;
    setShowNotification: Dispatch<SetStateAction<boolean>>;
    useNotification: (notification: string) => React.ReactNode|null;
    showNotification: boolean;
    sortOrder: string;
    sortCondition: string;
    todos: Todo[];
    
  }