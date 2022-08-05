import React, { Component } from "react";
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const selectedModal = document.querySelector('#modal');

class Modal extends Component{
  
  element = document.createElement('div');

  componentDidMount() {
    selectedModal.appendChild(this.element)
  }
 
  componentWillUnmount() {
  selectedModal.removeChild(this.element)
}

  render() {
    if (!this.props.open) {
      return null
    }
    return createPortal(
      <div className={s.overlay}
        onClick={this.props.onClose}>
        <div className={s.modal}>
          <img src='{largeImageURL}' alt='{tags}' />
        </div>
      </div>,
      selectedModal)
  }
}
export default Modal;
