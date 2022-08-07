import React from 'react';
// import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL, tags, onClick}) => {
  return (
    <li className={s.galleryItem} key={id}>
      <img
        onClick={() => onClick(largeImageURL, tags)}
        src={webformatURL}
        alt={tags}
        data-source={largeImageURL}
      />
    </li>
  )
}

export default ImageGalleryItem;


