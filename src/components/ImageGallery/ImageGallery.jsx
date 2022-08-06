
import { Component } from "react";
import Modal from "../Modal/Modal";
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
// import Audio from '../Loader';
import { TailSpin } from 'react-loader-spinner';
import s from './ImageGallery.module.css';



export default class ImageGallery extends Component {
  state = {
    images: null,
    error: null,
    status: 'idle',
    showModal: false,
    largePicture: null,
  };

  toggleModal = (picture) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largePicture: picture });
  };

  componentDidUpdate(prevProps, prevState) {
    const prevImage = prevProps.imageInfo;
    const nextImage = this.props.imageInfo;

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending'});      
        fetch(`https://pixabay.com/api/?q=${nextImage}&page=1&key=27913920-68ceae66209fe678afbf6b110&image_type=photo&orientation=horizontal&per_page=12`)
          .then(response => {
            if (response.ok) {
              return response.json();
            }
            return Promise.reject(
              new Error(`Нет таких картинок c именем ${nextImage}`),
            );
      })
          .then(images => this.setState({ images, status:'resolved' }))
          .catch(error=>this.setState({error, status:'rejected'}))            
        }
    }
  render() {
    const { images, error, status, showModal, largePicture } = this.state;
    
    if (status === 'idle') {
      return <div>Введите имя</div>
    }
    if (status === 'pending') {
      return <TailSpin color="#00BFFF" height={180} width={180} />
    }
    if (status==='rejected') {
      return <h1>{error.message}</h1>
    }
    if (status === 'resolved') {
      return (<>
        <ul className={s.gallery} >
          {images.hits.map(item => {
            return (
              <ImageGalleryItem
                key={item.id}
                picture={item}
                onClick={this.toggleModal}
              />
            );
          })}
        </ul>
        
        {showModal && <Modal
          onClose={this.toggleModal}
          largePicture={largePicture}
        />}
        </>
      )
    }
  }
};
