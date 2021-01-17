import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { todoThunkUpdated } from '../todosSlice';
import { Button } from '../../common components/Button';

export const TodoEditForm = ({ todo, setEditMode }) => {
  const [inputText, setInputText] = useState(todo.task);
  const dispatch = useDispatch();

  useEffect(() => {
    document.addEventListener('keydown', captureKeyboardEvents);
    return () => {
      document.removeEventListener('keydown', captureKeyboardEvents);
    };
  }, [inputText]);

  return (
    <div className={classNames('flex flex-col w-full')}>
      <input
        type="text"
        value={inputText}
        className={classNames(
          'ring-gray-400 ring-2 ring-opacity-50 px-2 py-1 rounded-full outline-none'
        )}
        onChange={e => {
          setInputText(e.target.value);
        }}
      />
      <div
        id="buttons"
        className={classNames(
          'flex flex-row-reverse self-end mt-4 w-full md:w-6/12 lg:w-3/12 justify-between'
        )}
      >
        <Button
          tag="Close"
          hoverColor="red"
          onClick={() => setEditMode(false)}
        />
        <Button
          tag="Save"
          hoverColor="green"
          onClick={() => saveTodoChange()}
        />
      </div>
    </div>
  );
  function captureKeyboardEvents(e) {
    if (e.key === 'Enter') {
      saveTodoChange();
    } else if (e.key === 'Escape') {
      setEditMode(false);
    }
  }
  function saveTodoChange() {
    dispatch(
      todoThunkUpdated({
        id: todo.id,
        changes: {
          task: inputText,
        },
      })
    );
    setEditMode(false);
  }
};
TodoEditForm.propTypes = {
  todo: PropTypes.object,
  setEditMode: PropTypes.func,
};
