import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageAPI from '../services/image-api'
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
    showBtn: false,
  };
  
  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  async componentDidUpdate(_, prevState) {
    const prevImage = prevState.imageSearch;
    const nextImage = this.state.imageSearch;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevImage !== nextImage || prevPage !== nextPage) {
      try {
        this.setState({ status: 'pending' });
         
        const imagesData =  await ImageAPI.fetchImage(nextImage, nextPage);
        this.setState({
          status: 'resolved',
          showBtn: true,
        });
       
            if (nextPage === 1) {
              this.setState({
                images: imagesData.hits,
                
              });
            } else {
              this.setState({
                images: [...prevState.images, ...imagesData.hits ],
              });
            }
    
            if (imagesData.total === 0) {
              this.setState({
                status: 'rejected',
                images: [],
                showBtn: false
              });
        }
        
            if (imagesData.total > 0 && imagesData.hits.length < 12) {
              this.setState({                
                showBtn: false,
              });
        }          
        
      } catch (error) {
        this.setState({ error, status: 'rejected' })
      }
    }
  }
  
  handleFormSubmit = imageSearch => {
    this.setState({
      imageSearch,
      images: [],
    page: 1, });
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

          {status === 'idle' && (
            <h2 className={s.h2}>Type something...</h2>
          )}

        {status === 'pending' && (
          <TailSpin color="#00BFFF" height={180} width={180} />)}

          {status === 'rejected' && (
            <h2 className={s.h2}>{'Not found...'}</h2>
          )}

        {status === 'resolved' && (
          <>
          <ImageGallery images={images} openModal={this.toggleModal} />
            {showBtn && <Button onClick={this.loadMore} />}
          </>
        )}
        {showModal && (<Modal
          onClose={this.toggleModal}
          largePicture={largePicture}
          tags={tags}
        />)}
        <ToastContainer position="top-center" theme="colored" />
        </div>
    ) }
  }
