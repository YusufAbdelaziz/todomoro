import React from 'react';
import classNames from 'classnames';
import { Button } from '../common components/Button';
import PropTypes from 'prop-types';

export const Settings = ({ toggleModal, setMinutes, minutes }) => {
  return (
    <div
      style={{ backgroundColor: '#1b1d39' }}
      className={classNames('flex flex-col container p-6 rounded-lg w-96')}
    >
      <div className={'flex flex-row justify-between text-lg text-white'}>
        <p>Session minutes : </p>
        <button onClick={() => (minutes < 45 ? setMinutes(minutes + 5) : {})}>
          +
        </button>
        <p>{minutes}</p>
        <button onClick={() => (minutes > 20 ? setMinutes(minutes - 5) : {})}>
          -
        </button>
      </div>
      <div className="mt-5 self-end">
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
  setMinutes: PropTypes.func,
  minutes: PropTypes.number,
};
