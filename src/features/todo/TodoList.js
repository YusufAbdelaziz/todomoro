import React from 'react';
import { useSelector } from 'react-redux';
import { selectTodoIds } from './todosSlice';
import { TodoItem } from './TodoItem/TodoItem';
import PropTypes from 'prop-types';
import { LoadingIndicator } from '../common components/LoadingIndicator';
import './todo.module.scss';
// import { useTransition, animated, config } from 'react-spring';

export const TodoList = ({ todosState }) => {
  const todoIds = useSelector(selectTodoIds);
  const isLoading = useSelector(state => state.todos.isLoading);
  console.log('TodoList is rendered');

  // For some reason, transitions aren't working in deployment.

  // const todoTransitions = useTransition(todoIds, {
  //   config: config.gentle,
  //   from: { opacity: 0, transform: 'translate3d(-25%, 0px, 0px)' },
  //   enter: { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
  //   leave: { opacity: 0, transform: 'translate3d(25%, 0px, 0px)' },

  //   keys: todoIds.map(id => id),
  // });

  if (isLoading) {
    console.log('loaading');
    return <LoadingIndicator />;
  }
  if (todoIds.length === 0) {
    return (
      <p className="pt-8 text-xl text-gray-300 select-none">
        Start adding your todos !
      </p>
    );
  }

  return (
    <div className="w-72 sm:w-1/2 lg:w-7/12">
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
        <div key={todoId}>
          <TodoItem todoId={todoId} todoState={todosState} />
        </div>
      ))}
    </div>
  );
};
TodoList.propTypes = {
  todosState: PropTypes.string.isRequired,
};
