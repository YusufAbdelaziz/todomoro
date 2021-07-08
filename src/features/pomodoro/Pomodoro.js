import React, { useState, useRef, useEffect } from 'react';
import styles from './pomodoro.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../common components/Modal';
import { Settings } from './Settings.jsx';

export const Pomodoro = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(25);
  const [hasTimerStarted, setTimerState] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const initialMinutes = useRef(0);

  useInterval(() => countDown(), hasTimerStarted ? 1000 : null);
  function countDown() {
    if (seconds == 0 && minutes == 0) {
      setTimerState(false);
      setMinutes(1);
    } else if (seconds == 0) {
      setSeconds(59);
      if (initialMinutes.current < minutes) {
        initialMinutes.current = minutes;
      }
      setMinutes(minutes - 1);
    } else {
      setSeconds(seconds - 1);
    }
  }
  return (
    <div
      className="flex flex-col items-center justify-start w-full mt-10"
      style={{ backgroundColor: '#1E2140' }}
    >
      <div className={classNames('flex flex-row items-center justify-center')}>
        <div
          id="clock"
          className={classNames(
            'w-80 h-80 rounded-full border-black border-solid border-2 border-opacity-40',
            'flex flex-col items-center justify-between m-5'
          )}
        >
          <div id="time" className={styles.time}>
            <span className={styles['time-text']}>
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>
          <div className="flex flex-col justify-between h-20 mb-4">
            <button
              onClick={() => setTimerState(!hasTimerStarted)}
              className="text-white font-mono text-2xl focus:outline-none"
            >
              {hasTimerStarted ? 'Pause' : 'Start'}
            </button>
            <button
              onClick={() => {
                // Set the minutes to the initial value and let seconds be equal to zero.
                // Reset the current initial minutes value.
                setMinutes(initialMinutes.current);
                setSeconds(0);
                initialMinutes.current = 0;
              }}
              className="text-white font-mono text-lg focus:outline-none"
            >
              Reset
            </button>
          </div>
        </div>
        {/* <div id="buttons" className={'flex flex-col justify-between w-10 h-24'}>
          <button
            className={classNames(styles['custom-button'])}
            id="plus-button"
            onClick={() => setMinutes(minutes + 1)}
          >
            +
          </button>
          <button
            className={classNames(styles['custom-button'])}
            id="minus-button"
            onClick={() => {
              if (minutes != 0) {
                setMinutes(minutes - 1);
              }
            }}
          >
            -
          </button>
        </div> */}
      </div>
      <FontAwesomeIcon
        onClick={() => toggleModal(!showModal)}
        icon={faCog}
        size={'lg'}
        className={classNames('text-red-400 shadow-lg', styles['icon'])}
      />
      {showModal ? (
        <Modal>
          <Settings
            toggleModal={toggleModal}
            minutes={minutes}
            setMinutes={setMinutes}
          />
        </Modal>
      ) : (
        <></>
      )}
    </div>
  );
};

// The issue with using setInterval only is that the passed closure has its old state saved and we cannot change the reference
// of the closure without resetting the timer, thus we had to create a persisted variable using useRef hook so it stores
// the last callback that was passed, and we can pass it to the setInterval using refName.current field so we can mutate it
// using useEffect and our setInterval that was set from the previous call would use the fresh version of our callback.
// Credits to Dan Abramov.
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
