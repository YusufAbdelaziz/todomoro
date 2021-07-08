import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import { todoThunkAdded } from './todosSlice';
import classNames from 'classnames';
import styles from './todo.module.scss';

export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [todosState, setTodosState] = useState('all');
  const dispatch = useDispatch();
  const submitTodo = () => {
    dispatch(todoThunkAdded(todoText.trim()));
    setTodoText('');
  };
  return (
    <div className="flex flex-col items-center justify-start w-full mt-10">
      <h1 className="font-semibold text-2xl font-sans text-gray-400">
        My To-Dos
      </h1>
      <div
        id="todo-form"
        className={classNames(
          'my-4 container',
          'flex items-center flex-col md:flex-row md:justify-evenly'
        )}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            if (todoText) submitTodo();
          }}
        >
          <input
            type="text"
            value={todoText}
            placeholder="Add your todo here..."
            className={classNames(
              'px-4 shadow-md',
              'transition-all',
              'mb-4 md:mb-0',
              'py-1',
              'focus:ring-gray-400 focus:shadow-none focus:border-transparent focus:ring-1 focus:outline-none',
              'w-72 lg:w-96',
              'rounded-full',
              'outline-none'
            )}
            onChange={e => setTodoText(e.target.value)}
          />
        </form>
        <button
          id="submit-todo"
          type="button"
          onClick={() => {
            if (todoText) submitTodo();
          }}
          style={{ color: '#1e2140' }}
          className={classNames(
            'bg-red-400 font-bold',
            styles['custom-button'],
            'transition-all ease-out',
            'px-5 py-1',
            'rounded-full',
            'focus:ring-1 focus:ring-opacity-100 focus:ring-black focus:outline-none'
          )}
        >
          Add
        </button>
      </div>
      <div
        id="filters"
        className={classNames(
          styles['filters'],
          ' w-3/4 rounded-full mb-3 mt-2 py-2 px-3 flex flex-row justify-evenly'
        )}
      >
        <button
          onClick={() => setTodosState('all')}
          style={{ color: todosState === 'all' ? '#1e2140' : '' }}
          className={classNames(
            styles['custom-button'],
            'font-bold rounded-l-full w-full outline-none focus:outline-none text-center',
            {
              'bg-red-400': todosState === 'all',
            }
          )}
        >
          <p>All</p>
        </button>
        <button
          onClick={() => setTodosState('active')}
          style={{ color: todosState === 'active' ? '#1e2140' : '' }}
          className={classNames(
            styles['custom-button'],
            'font-bold w-full outline-none focus:outline-none text-center',
            {
              'bg-red-400': todosState === 'active',
            }
          )}
        >
          <p>Active</p>
        </button>
        <button
          onClick={() => setTodosState('completed')}
          style={{ color: todosState === 'completed' ? '#1e2140' : '' }}
          className={classNames(
            styles['custom-button'],
            'font-bold rounded-r-full w-full focus:outline-none text-center outline-none',
            {
              'bg-red-400': todosState === 'completed',
            }
          )}
        >
          <p>Completed</p>
        </button>
      </div>

      <TodoList todosState={todosState} />
    </div>
  );
};
