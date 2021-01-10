import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoById, todoUpdated, todoRemoved } from '../todosSlice';
import classNames from 'classnames';
import styles from './todoItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons';
import { TodoEditForm } from './TodoEditForm';

export const TodoItem = ({ todoId }) => {
  const todo = useSelector(state => selectTodoById(state, todoId));
  const dispatch = useDispatch();
  const [hasEdited, setEditMode] = useState(false);
  console.log('Todo', todo);
  console.log('TodoId', todoId);
  if (!todo) {
    return <div className="h-0 w-0"></div>;
  }
  return (
    <div className="flex flex-row justify-between w-full">
      {hasEdited ? (
        <TodoEditForm todo={todo} setEditMode={setEditMode} />
      ) : (
        <Fragment>
          <div className="flex flex-row ">
            <label
              htmlFor={`checkbox ${todoId}`}
              className={classNames(
                { 'text-gray-700': !todo.hasCompleted },
                { 'line-through text-gray-400': todo.hasCompleted },
                styles['custom-container']
              )}
            >
              {todo.task}

              <input
                type="checkbox"
                id={`checkbox ${todoId}`}
                checked={todo.hasCompleted || false}
                onChange={e => {
                  e.stopPropagation();
                  dispatch(
                    todoUpdated({
                      id: todoId,
                      changes: { hasCompleted: !todo.hasCompleted },
                    })
                  );
                }}
              />

              <span className={styles['checkmark']}></span>
            </label>
            {todo.hasCompleted ? (
              <span className="self-center ml-2 text-md">
                {todo.completetionEmoji}
              </span>
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-row justify-between self-center w-14">
            <FontAwesomeIcon
              onClick={() => dispatch(todoRemoved(todoId))}
              icon={faTrash}
              className={classNames(styles['icon'])}
              size="1x"
            />
            <FontAwesomeIcon
              onClick={() => setEditMode(true)}
              icon={faPen}
              className={classNames(styles['icon'])}
              size="1x"
            />
          </div>
        </Fragment>
      )}
    </div>
  );
};

TodoItem.propTypes = {
  todoId: PropTypes.string.isRequired,
};
