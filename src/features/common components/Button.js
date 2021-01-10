import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Button = ({ tag, hoverColor, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        'bg-gray-400 bg-opacity-80',
        'transition-all ease-out box-border',
        'text-white',
        `hover:bg-${hoverColor}-400 hover:bg-opacity-100 shadow-md`,
        'px-5 py-1',
        'rounded-full',
        'focus:ring-1 focus:ring-opacity-30 focus:ring-black focus:outline-none'
      )}
    >
      {tag}
    </button>
  );
};
Button.propTypes = {
  tag: PropTypes.string,
  hoverColor: PropTypes.string,
  onClick: PropTypes.func,
  onKeyDown: PropTypes.func,
};
