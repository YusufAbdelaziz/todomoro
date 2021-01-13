import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { selectTodoById, todoUpdated, todoRemoved } from '../todosSlice';
import classNames from 'classnames';
import styles from './todoItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faInfo } from '@fortawesome/free-solid-svg-icons';
import { TodoEditForm } from './TodoEditForm';
import { Modal } from '../../common components/Modal';
import { format, parseISO } from 'date-fns';
import { Button } from '../../common components/Button';

export const TodoItem = ({ todoId, todoState }) => {
  const todo = useSelector(state => selectTodoById(state, todoId));
  const dispatch = useDispatch();
  const [hasEdited, setEditMode] = useState(false);
  const [showModal, toggleModal] = useState(false);
  console.log('Todo', todo);
  console.log('TodoId', todoId);
  if (
    !todo ||
    (todo.hasCompleted === false && todoState === 'completed') ||
    (todo.hasCompleted === true && todoState === 'active')
  ) {
    return <div className="h-0 w-0"></div>;
  }
  return (
    <div
      className={classNames(
        'flex flex-row justify-between w-full',
        ' rounded-md shadow-md ',
        'flex flex-row justify-between',
        'border-t-2 border-r-2 border-l-2 border-opacity-60',
        'my-2 p-3'
      )}
    >
      {hasEdited ? (
        <TodoEditForm todo={todo} setEditMode={setEditMode} />
      ) : (
        <Fragment>
          <div className="flex flex-row">
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
          <div className="flex flex-row justify-between self-center w-20">
            <FontAwesomeIcon
              onClick={() => toggleModal(!showModal)}
              size="1x"
              icon={faInfo}
              className={classNames(styles['icon'])}
            />
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
      {showModal ? (
        <Modal>
          <div
            className={classNames(
              'flex flex-col container p-6 bg-white rounded-lg'
            )}
          >
            <p>
              <span className="text-gray-400 font-semibold">Task</span> :{' '}
              {todo.task}
            </p>
            <p>
              <span className="text-gray-400 font-semibold">Created at</span> :{' '}
              {format(parseISO(todo.date), 'PPpp')}
            </p>
            <p>
              <span className="text-gray-400 font-semibold">Finished</span> :{' '}
              {todo.hasCompleted ? 'Yes' : 'No'}
            </p>
            <div className="mt-5 self-end">
              <Button
                tag="Close"
                hoverColor="red"
                onClick={() => toggleModal(false)}
              />
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  );
};

TodoItem.propTypes = {
  todoId: PropTypes.string.isRequired,
  todoState: PropTypes.string.isRequired,
};