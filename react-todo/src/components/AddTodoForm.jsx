// src/AddTodoForm.js
import React, { useState } from "react";

export default function AddTodoForm({ onAddTodo }) {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Add a new todo"
        data-testid="add-todo-input"
      />
      <button type="submit" data-testid="add-todo-button">
        Add
      </button>
    </form>
  );
}