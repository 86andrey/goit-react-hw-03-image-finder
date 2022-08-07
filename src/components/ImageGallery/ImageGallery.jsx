
import ImageGalleryItem from './ImageGalleryItem';
import s from './ImageGallery.module.css';


export default function ImageGallery({ images, openModal }) {
  return (
        <ul className={s.gallery}>
          {images.hits.map(({ id, webformatURL, largeImageURL, tags }) => (
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
    
      
  