import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TodoList } from './TodoList';
import { todoAdded } from './todosSlice';
import classNames from 'classnames';
import './todo.module.scss';
export const Todo = () => {
  const [todoText, setTodoText] = useState('');
  const [todosState, setTodosState] = useState('all');
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
      <div
        className={classNames(
          'w-auto mx-8 md:w-1/2 lg:w-1/3 rounded-full mb-3 mt-2',
          'border-solid border border-gray-400 border-collapse shadow-sm'
        )}
      >
        <table className={classNames('w-full text-center table-fixed')}>
          <tbody>
            <tr>
              <td
                onClick={() => setTodosState('all')}
                className={classNames(
                  'border-solid border-r border-gray-400 rounded-l-full',
                  { 'bg-gray-400': todosState === 'all' },
                  { 'text-white': todosState === 'all' }
                )}
              >
                All
              </td>
              <td
                onClick={() => setTodosState('active')}
                className={classNames(
                  'border-solid border-r border-gray-400',
                  { 'bg-gray-400': todosState === 'active' },
                  { 'text-white': todosState === 'active' }
                )}
              >
                Active
              </td>
              <td
                onClick={() => setTodosState('completed')}
                className={classNames(
                  'rounded-r-full border-solid border-gray-400',
                  { 'bg-gray-400': todosState === 'completed' },
                  { 'text-white': todosState === 'completed' }
                )}
              >
                Completed
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <TodoList todosState={todosState} />
    </div>
  );
};
