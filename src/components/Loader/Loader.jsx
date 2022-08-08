import { TailSpin } from 'react-loader-spinner';
import React from 'react';
import s from './Loader.module.css';
import PropTypes from 'prop-types';

export default function Loader() {
    return (<div className={s.div}>
        <TailSpin
            height="80"
            width="80"
            radius="9"
            color="green"
            ariaLabel="three-dots-loading"
            wrapperStyle
            wrapperClass
        />
        ;
    </div>
    );
}

Loader.propTypes = {
  query: PropTypes.string,
};
