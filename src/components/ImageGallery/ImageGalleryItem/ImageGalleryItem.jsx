import React from 'react';
// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ picture }) => {
  return (
    <li className={s.galleryItem}>
      <img
       
        src={picture.webformatURL}
        alt={picture.tags}
      />
    </li>
  )
}

export default ImageGalleryItem;


