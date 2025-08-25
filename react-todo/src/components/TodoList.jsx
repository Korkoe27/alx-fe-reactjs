// src/TodoList.js - Enhanced with data-testid attributes
import React, { useState } from "react";
import AddTodoForm from "./AddTodoForm";

export default function TodoList() {
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", completed: false },
    { id: 2, text: "Build a Todo App", completed: false },
  ]);

  const addTodo = (text) => {
    if (!text.trim()) return;
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div data-testid="todo-list-container">
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <ul data-testid="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.completed ? "line-through" : "none",
              cursor: "pointer",
            }}
            data-testid={`todo-item-${todo.id}`}
          >
            <span data-testid={`todo-text-${todo.id}`}>{todo.text}</span>
            <button
              onClick={(e) => {
                e.stopPropagation(); // prevent toggle when deleting
                deleteTodo(todo.id);
              }}
              data-testid={`delete-todo-${todo.id}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      {todos.length === 0 && (
        <p data-testid="empty-message">No todos yet. Add one above!</p>
      )}
    </div>
  );
}