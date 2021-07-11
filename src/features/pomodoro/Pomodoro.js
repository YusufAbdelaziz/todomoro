import React, { useState, useRef, useEffect } from 'react';
import styles from './pomodoro.module.scss';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Modal } from '../common components/Modal';
import { Settings } from './Settings.jsx';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import sound from '../../assets/success.mp3';

export const Pomodoro = () => {
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [breakSeconds, setBreakSeconds] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [hasTimerStarted, setTimerState] = useState(false);
  const [hasBreakStarted, setBreakState] = useState(false);
  const [showModal, toggleModal] = useState(false);
  const initialPomodoroMinutes = useRef(0);
  const initialBreakMinutes = useRef(0);

  useInterval(
    () => (hasBreakStarted ? countBreakDown() : countPomodoroDown()),
    hasTimerStarted ? 1000 : null
  );
  const audioElement = document.getElementById('success-audio');

  function getProgressIndicatorValue() {
    if (hasBreakStarted) {
      let totalMinutes = breakMinutes + breakSeconds / 60;
      return (totalMinutes / initialBreakMinutes.current) * 100;
    } else {
      let totalMinutes = pomodoroMinutes + pomodoroSeconds / 60;
      return (totalMinutes / initialPomodoroMinutes.current) * 100;
    }
  }
  return (
    <div
      className="flex flex-col items-center justify-start w-full md:mt-20 mt-40 "
      // style={{ backgroundColor: '#1E2140' }}
    >
      <div className="w-72 h-72">
        <CircularProgressbarWithChildren
          value={getProgressIndicatorValue()}
          strokeWidth={3}
          styles={buildStyles({
            pathColor: hasBreakStarted
              ? `rgba(226, 107, 90)`
              : `rgba(248, 113, 113)`,
            textColor: 'white',
          })}
        >
          <div>
            <span className={`${styles['time-text']}`}>
              {hasBreakStarted
                ? `${breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes}:${
                    breakSeconds < 10 ? `0${breakSeconds}` : breakSeconds
                  }`
                : `${
                    pomodoroMinutes < 10
                      ? `0${pomodoroMinutes}`
                      : pomodoroMinutes
                  }:${
                    pomodoroSeconds < 10
                      ? `0${pomodoroSeconds}`
                      : pomodoroSeconds
                  }`}
            </span>
          </div>
        </CircularProgressbarWithChildren>
      </div>

      {hasBreakStarted ? (
        <span className="text-2xl mt-5" style={{ color: `rgba(226, 107, 90)` }}>
          Take a break !
        </span>
      ) : (
        <></>
      )}
      <button
        onClick={() => setTimerState(!hasTimerStarted)}
        className="text-white font-mono text-2xl focus:outline-none my-5"
      >
        {hasTimerStarted ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => {
          // Set the minutes to the initial value and let seconds be equal to zero.
          // Reset the current initial minutes value.
          if (hasBreakStarted) {
            setBreakMinutes(initialBreakMinutes.current);
            setBreakSeconds(0);
            initialBreakMinutes.current = 0;
            setTimerState(false);
          } else {
            setPomodoroMinutes(initialPomodoroMinutes.current);
            setPomodoroSeconds(0);
            initialPomodoroMinutes.current = 0;
            setTimerState(false);
          }
        }}
        className="text-white font-mono text-lg focus:outline-none"
      >
        Reset
      </button>

      {/* </div> */}

      <FontAwesomeIcon
        onClick={() => toggleModal(!showModal)}
        icon={faCog}
        size={'lg'}
        className={classNames('text-red-400 shadow-lg my-4', styles['icon'])}
      />
      {showModal ? (
        <Modal>
          <Settings
            toggleModal={toggleModal}
            pomodoroMinutes={pomodoroMinutes}
            setPomodoroMinutes={setPomodoroMinutes}
            breakMinutes={breakMinutes}
            setBreakMinutes={setBreakMinutes}
          />
        </Modal>
      ) : (
        <></>
      )}
      <audio id="success-audio">
        <source src={sound} type="audio/mpeg" />
      </audio>
    </div>
  );
  function countPomodoroDown() {
    if (pomodoroSeconds == 0 && pomodoroMinutes == 0) {
      setTimerState(true);
      setBreakState(true);
      audioElement.play();

      setPomodoroMinutes(initialPomodoroMinutes.current);
    } else if (pomodoroSeconds == 0) {
      setPomodoroSeconds(59);
      if (initialPomodoroMinutes.current < pomodoroMinutes) {
        initialPomodoroMinutes.current = pomodoroMinutes;
      }
      setPomodoroMinutes(pomodoroMinutes - 1);
    } else {
      setPomodoroSeconds(pomodoroSeconds - 1);
    }
  }
  function countBreakDown() {
    if (breakSeconds == 0 && breakMinutes == 0) {
      setTimerState(false);
      setBreakState(false);
      audioElement.play();
      setBreakMinutes(initialBreakMinutes.current);
    } else if (breakSeconds == 0) {
      setBreakSeconds(59);
      if (initialBreakMinutes.current < breakMinutes) {
        initialBreakMinutes.current = breakMinutes;
      }
      setBreakMinutes(breakMinutes - 1);
    } else {
      setBreakSeconds(breakSeconds - 1);
    }
  }
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
