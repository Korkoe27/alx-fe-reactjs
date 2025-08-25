import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddTodoForm from '../components/AddTodoForm';

describe('AddTodoForm Component', () => {
  test('renders form elements correctly', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    // Check if input and button are rendered
    expect(screen.getByTestId('todo-input')).toBeInTheDocument();
    expect(screen.getByTestId('add-todo-button')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter a new todo')).toBeInTheDocument();
  });

  test('calls onAddTodo when form is submitted with valid input', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('add-todo-form');
    
    // Enter text and submit form
    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.submit(form);
    
    // Check if callback was called with correct value
    expect(mockAddTodo).toHaveBeenCalledWith('New Todo');
    expect(mockAddTodo).toHaveBeenCalledTimes(1);
    
    // Check if input was cleared
    expect(input.value).toBe('');
  });

  test('does not call onAddTodo when form is submitted with empty input', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const form = screen.getByTestId('add-todo-form');
    
    // Submit form without entering text
    fireEvent.submit(form);
    
    // Callback should not be called
    expect(mockAddTodo).not.toHaveBeenCalled();
  });

  test('trims whitespace before calling onAddTodo', () => {
    const mockAddTodo = jest.fn();
    render(<AddTodoForm onAddTodo={mockAddTodo} />);
    
    const input = screen.getByTestId('todo-input');
    const form = screen.getByTestId('add-todo-form');
    
    // Enter text with whitespace and submit
    fireEvent.change(input, { target: { value: '  Trimmed Todo  ' } });
    fireEvent.submit(form);
    
    // Should be called with trimmed value
    expect(mockAddTodo).toHaveBeenCalledWith('Trimmed Todo');
  });
});