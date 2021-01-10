import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import { todoAdded } from './todosSlice';
import classNames from 'classnames';

export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const dispatch = useDispatch();
  const submitTodo = () => {
    dispatch(todoAdded(todoText));
    setTodoText('');
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="font-semibold text-2xl font-sans text-gray-400">
        My To-Dos
      </h1>
      <div
        className={classNames(
          'my-4 container w-5/12 md:w-1/2',
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
              'w-72 lg:w-80',
              'rounded-full',
              'outline-none'
            )}
            onChange={e => setTodoText(e.target.value)}
          />
        </form>
        <button
          type="button"
          onClick={() => {
            if (todoText) submitTodo();
          }}
          className={classNames(
            'bg-gray-400 bg-opacity-80',
            'transition-all ease-out',
            'text-white',
            'hover:bg-gray-400 hover:bg-opacity-100 shadow-md',
            'px-5 py-1',
            'rounded-full',
            'focus:ring-1 focus:ring-opacity-30 focus:ring-black focus:outline-none'
          )}
        >
          Add
        </button>
      </div>
      <TodoList />
    </div>
  );
};
