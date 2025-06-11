import { createSlice } from '@reduxjs/toolkit';

const loadFromLocalStorage = () => {
  try {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const saveToLocalStorage = (todos) => {
  try {
    localStorage.setItem('todos', JSON.stringify(todos));
  } catch {}
};

const todoSlice = createSlice({
  name: 'todos',
  initialState: loadFromLocalStorage,
  reducers: {
    addTodo(state, action) {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
      saveToLocalStorage(state);
    },
    toggleTodo: (state, action) => {
      const todo = state.find(todo => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
        saveToLocalStorage(state);
      }
    },
    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
        saveToLocalStorage(state);
      }
    },
    editTodo(state, action) {
      const { id, text } = action.payload;
      const todo = state.find((t) => t.id === id);
      if (todo) {
        todo.text = text;
        saveToLocalStorage(state);
      }
    },
    clearTodos() {
      saveToLocalStorage([]);
      return [];
    }
  }
});

export const { addTodo, toggleTodo, deleteTodo, editTodo, clearTodos } = todoSlice.actions;
export default todoSlice.reducer;