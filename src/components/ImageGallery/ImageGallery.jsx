
import React from 'react';
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ images, openModal }) {
  return (
        <ul className={s.gallery}>
          {images.map(({ id, webformatURL, largeImageURL, tags }) => (
              <ImageGalleryItem
                key={id}
                webformatURL={webformatURL}
                largeImageURL={largeImageURL}
                tags={tags}
                onClick={openModal}
              />
          ))}
        </ul>   
  )
}
    
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  openModal: PropTypes.func.isRequired,
};      
  