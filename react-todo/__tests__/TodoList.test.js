// src/__tests__/TodoList.test.js
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  beforeEach(() => {
    // Clean up before each test
    jest.clearAllMocks();
  });

  test("renders TodoList component with initial todos", () => {
    render(<TodoList />);
    
    // Check if the title is rendered
    expect(screen.getByRole("heading", { name: /todo list/i })).toBeInTheDocument();
    
    // Check if initial todos are rendered
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build a Todo App")).toBeInTheDocument();
    
    // Check if add todo input is rendered
    expect(screen.getByPlaceholderText("Add a new todo")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add/i })).toBeInTheDocument();
  });

  test("can add a new todo", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeInTheDocument();
    });
    
    // Input should be cleared after adding
    expect(input.value).toBe("");
  });

  test("can add a new todo by pressing Enter", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");

    fireEvent.change(input, { target: { value: "Todo via Enter" } });
    
    // Submit the form (which happens on Enter)
    const form = input.closest('form');
    fireEvent.submit(form);

    await waitFor(() => {
      expect(screen.getByText("Todo via Enter")).toBeInTheDocument();
    });

    // Input should be cleared
    expect(input.value).toBe("");
  });

  test("does not add empty or whitespace-only todos", () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByRole("button", { name: /add/i });
    
    // Get initial todo count
    const initialTodos = screen.getAllByText("Delete");
    const initialCount = initialTodos.length;
    
    // Try empty string
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    
    // Should still have same number of todos
    expect(screen.getAllByText("Delete")).toHaveLength(initialCount);
    
    // Try whitespace only
    fireEvent.change(input, { target: { value: "   " } });
    fireEvent.click(button);
    
    // Should still have same number of todos
    expect(screen.getAllByText("Delete")).toHaveLength(initialCount);
  });

  test("can toggle a todo completion status", () => {
    render(<TodoList />);
    const todoItem = screen.getByText("Learn React");

    // Initially should not be completed (no line-through)
    expect(todoItem.parentElement).toHaveStyle("text-decoration: none");

    // Click to toggle
    fireEvent.click(todoItem);

    // Should now be completed (line-through)
    expect(todoItem.parentElement).toHaveStyle("text-decoration: line-through");

    // Click again to toggle back
    fireEvent.click(todoItem);

    // Should not be completed again
    expect(todoItem.parentElement).toHaveStyle("text-decoration: none");
  });

  test("can delete a todo", async () => {
    render(<TodoList />);
    const todoText = "Learn React";
    const todoItem = screen.getByText(todoText);
    
    // Find the delete button for this specific todo
    const todoListItem = todoItem.closest('li');
    const deleteButton = todoListItem.querySelector('button');

    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(todoText)).not.toBeInTheDocument();
    });
  });

  test("delete button click does not toggle todo", async () => {
    render(<TodoList />);
    const todoText = "Learn React";
    const todoItem = screen.getByText(todoText);
    const todoListItem = todoItem.closest('li');
    
    // Ensure todo is not completed initially
    expect(todoListItem).toHaveStyle("text-decoration: none");
    
    // Click delete button
    const deleteButton = todoListItem.querySelector('button');
    fireEvent.click(deleteButton);

    // Todo should be deleted (not in document), so it wasn't toggled
    await waitFor(() => {
      expect(screen.queryByText(todoText)).not.toBeInTheDocument();
    });
  });

  test("shows empty message when all todos are deleted", async () => {
    render(<TodoList />);
    
    // Delete all todos
    const deleteButtons = screen.getAllByText("Delete");
    
    for (const button of deleteButtons) {
      fireEvent.click(button);
    }
    
    await waitFor(() => {
      expect(screen.getByText("No todos yet. Add one above!")).toBeInTheDocument();
    });
  });

  test("can add multiple todos", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByRole("button", { name: /add/i });

    // Add first todo
    fireEvent.change(input, { target: { value: "First new todo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("First new todo")).toBeInTheDocument();
    });

    // Add second todo
    fireEvent.change(input, { target: { value: "Second new todo" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Second new todo")).toBeInTheDocument();
    });

    // Should have 4 todos total (2 initial + 2 new)
    expect(screen.getAllByText("Delete")).toHaveLength(4);
  });

  test("trims whitespace from todo text", async () => {
    render(<TodoList />);
    const input = screen.getByPlaceholderText("Add a new todo");
    const button = screen.getByRole("button", { name: /add/i });

    fireEvent.change(input, { target: { value: "  Todo with spaces  " } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText("Todo with spaces")).toBeInTheDocument();
    });
    
    // Should not find the version with extra spaces
    expect(screen.queryByText("  Todo with spaces  ")).not.toBeInTheDocument();
  });
});