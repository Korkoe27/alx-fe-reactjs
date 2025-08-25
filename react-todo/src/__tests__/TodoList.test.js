import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoList from '../components/TodoList';

describe('TodoList Component', () => {
  test('renders TodoList component correctly', () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    expect(screen.getByText('Write Tests')).toBeInTheDocument();
    expect(screen.getByText('Build Todo App')).toBeInTheDocument();
  });

  test('renders initial state with demo todos', () => {
    render(<TodoList />);
    
    // Check that we have 3 initial todos
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(3);
    
    // Check that one todo is completed (has line-through)
    const completedTodo = screen.getByText('Build Todo App');
    expect(completedTodo).toHaveStyle('text-decoration: line-through');
  });

  test('adds a new todo', () => {
    render(<TodoList />);
    
    // Get the input and add button
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add a new todo
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    fireEvent.click(addButton);
    
    // Check if the new todo was added
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Check that we now have 4 todos
    const todoItems = screen.getAllByTestId('todo-item');
    expect(todoItems).toHaveLength(4);
    
    // Check that input is cleared
    expect(input.value).toBe('');
  });

  test('toggles todo completion status', () => {
    render(<TodoList />);
    
    // Find a todo that is not completed
    const todoText = screen.getByText('Learn React');
    
    // Initially should not have line-through
    expect(todoText).toHaveStyle('text-decoration: none');
    
    // Click to toggle completion
    fireEvent.click(todoText);
    
    // Should now have line-through
    expect(todoText).toHaveStyle('text-decoration: line-through');
    
    // Click again to toggle back
    fireEvent.click(todoText);
    
    // Should be back to no line-through
    expect(todoText).toHaveStyle('text-decoration: none');
  });

  test('deletes a todo', () => {
    render(<TodoList />);
    
    // Initially should have 3 todos
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    expect(screen.getByText('Learn React')).toBeInTheDocument();
    
    // Find and click the delete button for the first todo
    const deleteButtons = screen.getAllByTestId('delete-button');
    fireEvent.click(deleteButtons[0]);
    
    // Should now have 2 todos
    expect(screen.getAllByTestId('todo-item')).toHaveLength(2);
    
    // The deleted todo should no longer be in the document
    expect(screen.queryByText('Learn React')).not.toBeInTheDocument();
  });

  test('does not add empty todos', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Try to add empty todo
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.click(addButton);
    
    // Should still have only 3 todos
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
    
    // Try to add todo with only whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Should still have only 3 todos
    expect(screen.getAllByTestId('todo-item')).toHaveLength(3);
  });

  test('trims whitespace from new todos', () => {
    render(<TodoList />);
    
    const input = screen.getByTestId('todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Add todo with whitespace
    fireEvent.change(input, { target: { value: '  Trimmed Todo  ' } });
    fireEvent.click(addButton);
    
    // Should find the trimmed version
    expect(screen.getByText('Trimmed Todo')).toBeInTheDocument();
  });
});