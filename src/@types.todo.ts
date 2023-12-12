import { Dispatch, SetStateAction } from 'react';
export type ITodo={
    id: number;
    name: string;
    isCompleted?: boolean;
    subTasks?: Array<{ id: number; name: string; isSubTaskCompleted: boolean }>;
    priority: number;
    priorityLevel: number;
    complexity: number;
    complexityLevel: number;
    date: string;
    tags: string;
    hour: number;
    minute: string;
    period: string;
  
  }
  
  export type  TodoContextValue= {
    addTodo: (task: ITodo) => void;
    completeTodo: (todo: ITodo) => void;
    removeTodo: (todo: ITodo) => void;
    getTodo: (id: number) => ITodo | undefined;
    updateTodo: (task: ITodo) => void;
    completeSubTask: (todo: ITodo, id: number) => void;
    UpdateName: (todo: ITodo, newName: string) => void;
    setSortCondition: Dispatch<SetStateAction<string>>;
    setSortOrder: Dispatch<SetStateAction<string>>;
    getTodos: () => ITodo[];
    handleShowNotification: () => void;
    handleCloseNotification: () => void;
    setShowNotification: Dispatch<SetStateAction<boolean>>;
    useNotification: (notification: string) => React.ReactNode|null;
    showNotification: boolean;
    sortOrder: string;
    sortCondition: string;
    todos: ITodo[];
    
  }