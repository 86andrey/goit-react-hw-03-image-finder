import { Component } from "react";
import Searchbar from "./Searchbar";
import imageAPI from '../services/image-api'
import ImageGallery from "./ImageGallery";
// import Button from "./Button";
import Modal from "./Modal";
import { TailSpin } from 'react-loader-spinner';

import s from './App.module.css';
// import { ToastContainer } from 'react-toastify';


export default class App extends Component {
  state = {
    imageSearch: '',
    images: [],
    error: null,
    status: 'idle',
    largeImage: null,
    tags: null,
    showModal: false,
  };
  
  async componentDidUpdate(_, prevState) {
    const prevImage = prevState.imageSearch;
    const nextImage = this.state.imageSearch;

    if (prevImage !== nextImage) {
      this.setState({ status: 'pending' })
      imageAPI.fetchImage(nextImage)
        .then(images => this.setState({ images, status: 'resolved' }))
        .catch(error => this.setState({ error, status: 'rejected' }))
      // }
    }
  }
  
    handleFormSubmit = imageSearch => {
      this.setState({ imageSearch });
  };
  
  toggleModal = (largePicture, tags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largePicture: largePicture, tags:tags });
  };
  
  render() {
    const { images, largePicture, tags, error, status, showModal } = this.state;
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />

        {showModal && (<Modal
          onClose={this.toggleModal}
          largePicture={largePicture}
          tags={tags}
        />)}

          {status === 'idle' && (
            <h2>Type something...</h2>
          )}

        {status === 'pending' && (
          <TailSpin color="#00BFFF" height={180} width={180} />)}

          {status === 'rejected' && (
            <h1>{error.message}</h1>
          )}

        {status === 'resolved' && (
          <ImageGallery images={images} openModal={this.toggleModal} />
        )}

        </div>
    ) }
  }
  




// /*  */
          

//             /* {this.state.loading && <h1>reload...</h1>}
//       {this.state.pokemon && <div>Hello</div>} */
        
//           /* <ToastContainer position="top-center" theme="colored" /> */






// 
