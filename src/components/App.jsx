import { Component } from "react";
import Searchbar from "./Searchbar";
import s from './App.module.css';
import { ToastContainer } from 'react-toastify';
import ImageGallery from "./ImageGallery/ImageGallery";

export default class App extends Component {
  state = {
    imageInfo: '',
  };
  
  handleFormSubmit = imageInfo => {
    this.setState({ imageInfo });
  };
  
  render() {
    return (
      <div className={s.app}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        <ImageGallery imageInfo={this.state.imageInfo}/>
        {/* {this.state.loading && <h1>reload...</h1>}
      {this.state.pokemon && <div>Hello</div>} */}
        <ToastContainer position="top-center" theme="colored" />
      </div>
    );
  }
}
