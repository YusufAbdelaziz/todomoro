import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectTodoById,
  todoThunkUpdated,
  todoThunkRemoved,
} from '../todosSlice';
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
        'flex flex-row justify-between mx-4',
        'rounded-md shadow-lg',
        'flex flex-row justify-between',
        'border border-red-400',
        'my-2 p-3'
      )}
    >
      {hasEdited ? (
        <TodoEditForm todo={todo} setEditMode={setEditMode} />
      ) : (
        <div className="grid grid-flow-col grid-cols-9 md:grid-cols-10 lg:grid-cols-12">
          <div className="col-span-6 md:col-span-7 lg:col-span-9 flex flex-row">
            <div className={classNames(styles['custom-container'])}>
              <p
                onClick={() =>
                  dispatch(
                    todoThunkUpdated({
                      id: todoId,
                      changes: { hasCompleted: !todo.hasCompleted },
                    })
                  )
                }
                className={classNames(
                  { 'text-gray-300': !todo.hasCompleted },
                  { 'line-through text-gray-400': todo.hasCompleted },
                  'truncate overflow-auto'
                )}
              >
                {todo.task}
              </p>
              <label htmlFor={`checkbox ${todoId}`} className="cursor-pointer">
                <input
                  type="checkbox"
                  id={`checkbox ${todoId}`}
                  checked={todo.hasCompleted || false}
                  onChange={e => {
                    e.stopPropagation();
                    dispatch(
                      todoThunkUpdated({
                        id: todoId,
                        changes: { hasCompleted: !todo.hasCompleted },
                      })
                    );
                  }}
                />
                <span className={styles['checkmark']}></span>
              </label>
            </div>
            {todo.hasCompleted ? (
              <span className="self-center ml-2 text-md">
                {todo.completionEmoji}
              </span>
            ) : (
              <></>
            )}
          </div>

          <div
            id="action-buttons"
            className="flex flex-row justify-between self-center w-20 ml-2 md:ml-6 lg:ml-9 xl:ml-12 col-2 md:col-2"
          >
            <FontAwesomeIcon
              onClick={() => toggleModal(!showModal)}
              size="1x"
              icon={faInfo}
              className={classNames(styles['icon'])}
            />
            <FontAwesomeIcon
              onClick={() => dispatch(todoThunkRemoved(todoId))}
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
        </div>
      )}
      {showModal ? (
        <Modal>
          <div
            style={{ backgroundColor: '#1b1d39' }}
            className={classNames('flex flex-col container p-6 rounded-lg')}
          >
            <p className="text-gray-200">
              <span className="text-gray-400 font-semibold">Task</span> :{' '}
              {todo.task}
            </p>
            <p className="text-gray-200">
              <span className="text-gray-400 font-semibold">Created at</span> :{' '}
              {format(parseISO(todo.date), 'PPpp')}
            </p>
            <p className="text-gray-200">
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
