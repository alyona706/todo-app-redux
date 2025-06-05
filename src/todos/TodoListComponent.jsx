import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, toggleTodo, deleteTodo } from './todoSlice';
import './TodoListComponent.css';


export default function TodoListComponent() {
  const [text, setText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const todos = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();

    if (text.trim()) {
      dispatch(addTodo(text));
        setText('');
        setShowForm(false);
      }
    };

    return (
        <div className="todo-container">
          <h2>TODO App</h2>
          <button onClick={() => setShowForm(prev => !prev)}>
            {showForm ? 'Cancel' : 'Add Todo'}
          </button>

          {showForm && (
            <form className="add-todo" onSubmit={handleAdd}>
              <input value={text}
                   onChange={e => setText(e.target.value)}
                   placeholder="Enter task"
              />
              <button type="submit">Add</button>
            </form>
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
                <button type="button" onClick={() => dispatch(deleteTodo(todo.id))}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
    )
};

