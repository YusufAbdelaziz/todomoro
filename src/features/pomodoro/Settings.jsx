import React, { useState } from 'react';
import classNames from 'classnames';
import { Button } from '../common components/Button';
import { SmallButton } from './SmallButton';
import PropTypes from 'prop-types';

export const Settings = ({
  toggleModal,
  setPomodoroMinutes,
  pomodoroMinutes,
  setBreakMinutes,
  breakMinutes,
}) => {
  return (
    <div
      style={{ backgroundColor: '#1b1d39' }}
      className={classNames('flex flex-col container p-6 rounded-lg w-96')}
    >
      <div className={'flex flex-row justify-between text-lg text-white'}>
        <p>Pomodoro minutes : </p>
        <div className={'flex flex-row'}>
          <SmallButton
            onClick={() =>
              pomodoroMinutes < 45
                ? setPomodoroMinutes(pomodoroMinutes + 5)
                : {}
            }
          >
            +
          </SmallButton>
          <p className="mx-1">{pomodoroMinutes}</p>
          <SmallButton
            onClick={() =>
              pomodoroMinutes > 20
                ? setPomodoroMinutes(pomodoroMinutes - 5)
                : {}
            }
          >
            -
          </SmallButton>
        </div>
      </div>
      <div className={'flex flex-row justify-between text-lg text-white mt-5'}>
        <p>Break minutes : </p>
        <div className={'flex flex-row'}>
          <SmallButton
            onClick={() => {
              if (breakMinutes <= 15) setBreakMinutes(breakMinutes + 5);
            }}
          >
            +
          </SmallButton>
          <p className="mx-1">{breakMinutes}</p>
          <SmallButton
            onClick={() => {
              if (breakMinutes >= 5) setBreakMinutes(breakMinutes - 5);
            }}
          >
            -
          </SmallButton>
        </div>
      </div>
      <div className="mt-10 self-end">
        <Button
          tag="Close"
          hoverColor="red"
          onClick={() => toggleModal(false)}
        />
      </div>
    </div>
  );
};
Settings.propTypes = {
  toggleModal: PropTypes.func,
  setPomodoroMinutes: PropTypes.func,
  pomodoroMinutes: PropTypes.number,
  setBreakMinutes: PropTypes.func,
  breakMinutes: PropTypes.number,
};
