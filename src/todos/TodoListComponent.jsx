import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo, editTodo, clearTodos } from './todoSlice';
import './TodoListComponent.css';


export default function TodoListComponent() {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (text.trim()) {
      if (editingId !== null) {
        dispatch(editTodo({ id: editingId, text }));
        setEditingId(null);
      } else {
        dispatch(addTodo(text));
      }
      setText("");
    }
  };

  const startEdit = (todo) => {
    setShowForm(true);
    setText(todo.text);
    setEditingId(todo.id);
  };

  const cancelEdit = () => {
    setText("");
    setEditingId(null);
  };

  return (
        <div className="todo-container">
          <h2>TODO App</h2>
          <button onClick={() => setShowForm(prev => !prev)}>
            {showForm ? 'Cancel' : 'Add Todo'}
          </button>

          {showForm && (
            <form className="add-todo" onSubmit={handleSubmit}>
              <input value={text}
                   onChange={e => setText(e.target.value)}
                   placeholder="Enter task"
              />
              <button type="submit">{editingId !== null ? "Save" : "Add"}</button>
              {editingId !== null && (
                <button type="button" onClick={cancelEdit}>Cancel</button>
              )}
            </form>
          )}

          {todos.length > 0 && (
            <button className="clear-btn" onClick={() => dispatch(clearTodos())}>Clear All</button>
          )}

          <ul className="todo-list">
            {todos.map(todo => (
              <li className="todo-item" key={todo.id}>
                <label>
                  <input type="checkbox"
                         checked={todo.completed}
                         onChange={() => dispatch(toggleTodo(todo.id))}
                  />
                  <p className={`todo-text ${todo.completed ? 'todo-completed' : ''}`}>{todo.text}</p>
                </label>
                <div className="todo-actions">
                  <button onClick={() => startEdit(todo)}>Edit</button>
                  <button onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
  )
};

