import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const SmallButton = ({ children, onClick }) => {
  return (
    <button
      className={classNames(
        'rounded-full mx-2 w-8 h-8',
        'bg-gray-400 bg-opacity-80',
        'transition-all ease-out box-border',
        `hover:bg-red-400 hover:bg-opacity-100 shadow-md`,
        'focus:ring-1 focus:ring-opacity-30 focus:ring-black focus:outline-none'
      )}
      onClick={() => onClick()}
    >
      {children}
    </button>
  );
};

SmallButton.propTypes = {
  children: PropTypes.string,
  onClick: PropTypes.func,
};
