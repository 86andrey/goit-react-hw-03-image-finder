import { Component } from "react";
import Searchbar from "./Searchbar";
import imageAPI from '../services/image-api'
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Modal from "./Modal";
import { TailSpin } from 'react-loader-spinner';

import s from './App.module.css';
import { ToastContainer } from 'react-toastify';



export default class App extends Component {
  state = {
    imageSearch: '',
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    largeImage: null,
    tags: null,
    showModal: false,
    showBtn: true,
    total: null,
    totalHits: null,
  };
  
  async componentDidUpdate(_, prevState) {
    const prevImage = prevState.imageSearch;
    const nextImage = this.state.imageSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
      this.setState({ status: 'pending' })
      imageAPI.fetchImage(nextImage, prevPage)
        .then(images => {
          this.setState({
            images,
            total: images.hits.length,
            totalHits: images.totalHits,
          })
          if (images.hits.length === 0) {
            this.setState({ status: 'rejected', images: [],});
          }
          if (images.hits.length < 12) {
            this.setState({
              // images: [...this.state.images, ...images.hits],
              status: 'resolved',
              showBtn: false,
            });
          }
          else {
            this.setState({
              images: [...this.state.images, ...images.hits],
              status: 'resolved',
              showBtn: true,
            })
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }))
    }
  }
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
    const { images, largePicture, tags, status, showModal, showBtn } = this.state;
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
            <h1>{'Not found...'}</h1>
          )}

        {status === 'resolved' && (
          <>
          <ImageGallery images={images} openModal={this.toggleModal} />
            {showBtn && <Button onClick={this.loadMore} />}
          </>
        )}

        <ToastContainer position="top-center" theme="colored" />
        </div>
    ) }
  }
