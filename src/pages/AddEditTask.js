import React from "react";
import TodoForm from "../components/TodoForm";
import { useParams } from "react-router";
export const AddEditTask = () => {
  return (
    <div>
      <TodoForm />
    </div>
  );
};
