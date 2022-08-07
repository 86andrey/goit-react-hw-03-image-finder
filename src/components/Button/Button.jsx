import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

const Button = ({ onClick }) => (
  <button type="button" onClick={onClick} className={s.button}>
    Load more
  </button>
);

Button.propTypes = {
  changePage: PropTypes.func.isRequired,
};

export default Button;