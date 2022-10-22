import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, OpenModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    console.log('componentDidMount');
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    window.addEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    console.log(e.code);
    if (e.code === 'Escape') {
      console.log('Escape!!!!');
      this.props.onClose();
    }
  };

  handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <OpenModal>
          <img src="" alt="" />
          <h1>MODAL</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <button type="button" onClick={this.props.onClose}>
            Закрыть
          </button>
          {/* {this.props.children} */}
        </OpenModal>
      </Overlay>,
      modalRoot
    );
  }
}
