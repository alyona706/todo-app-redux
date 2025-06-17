import React from 'react';
import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './todoSlice';
import TodoListComponent from './TodoListComponent';

const renderWithRedux = (component, { preloadedState } = {}) => {
  const store = configureStore({
    reducer: {
      todos: todoReducer,
    },
    preloadedState,
  });

  return render(<Provider store={store}>{component}</Provider>);
};

describe('TodoListComponent', () => {
  test('renders TODO App heading', () => {
    renderWithRedux(<TodoListComponent />);
    const linkElement = screen.getByText(/Add Todo/i);
    expect(linkElement).toBeInTheDocument();
  })

  test('allows input of letters and numbers', () => {
    renderWithRedux(<TodoListComponent />);
    fireEvent.click(screen.getByText(/Add Todo/i));
    const input = screen.getByPlaceholderText(/Enter task/i);
    fireEvent.change(input, { target: { value: 'test task' } });
    expect(input).toHaveValue('test task');
  });

  test('not add todo when input is empty', () => {
    renderWithRedux(<TodoListComponent />);
    fireEvent.click(screen.getByText(/Add Todo/i));
    const button = screen.getByRole('button', { name: /Add/i });
    fireEvent.click(button);
    const items = screen.queryAllByRole('listitem');
    expect(items.length).toBe(0);
  });

  test('add new todo to list', () => {
    renderWithRedux(<TodoListComponent />);
    fireEvent.click(screen.getByText(/Add Todo/i));
    const input = screen.getByPlaceholderText(/Enter task/i);
    fireEvent.change(input, { target: { value: 'Buy milk' } });
    fireEvent.click(screen.getByRole('button', { name: /Add/i }));
    expect(screen.getByText('Buy milk')).toBeInTheDocument();
  });

  test('toggles todo as completed', () => {
    const preloadedState = {
      todos: [{ id: 1, text: 'Buy milk', completed: false }],
    };

    renderWithRedux(<TodoListComponent />, { preloadedState });

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).not.toBeChecked();

    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();

    expect(screen.getByText('Buy milk')).toHaveClass('todo-completed');
  });
})