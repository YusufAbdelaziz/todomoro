import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodoIds } from './todosSlice';
import { TodoItem } from './TodoItem/TodoItem';
import { useTransition, animated, config } from 'react-spring';
import classNames from 'classnames';

export const TodoList = () => {
  const todoIds = useSelector(selectTodoIds);
  console.log('TodoList is rendered');
  const todoTransitions = useTransition(todoIds, {
    config: config.gentle,
    from: { opacity: 0, transform: 'translate3d(-25%, 0px, 0px)' },
    enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
    leave: { opacity: 0, transform: 'translate3d(25%, 0px, 0px)' },

    keys: todoIds.map(id => id),
  });

  if (todoIds.length === 0) {
    return (
      <p className="pt-8 text-xl text-gray-300">Start adding your todos !</p>
    );
  }

  return (
    <div className="w-64 sm:w-1/2 lg:w-7/12">
      {/* {todoTransitions((styles, todoId) => (
        <animated.div
          className={classNames(
            ' rounded-md shadow-md ',
            'flex flex-row justify-between',
            'border-t-2 border-r-2 border-l-2 border-opacity-60',
            'my-2 p-3'
          )}
          style={{
            ...styles,
          }}
        >
          <TodoItem todoId={todoId} />
        </animated.div>
      ))} */}
      {todoIds.map(todoId => (
        <div
          key={todoId}
          className={classNames(
            ' rounded-md shadow-md ',
            'flex flex-row justify-between',
            'border-t-2 border-r-2 border-l-2 border-opacity-60',
            'my-2 p-3'
          )}
        >
          <TodoItem todoId={todoId} />
        </div>
      ))}
    </div>
  );
};
