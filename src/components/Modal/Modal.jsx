import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, OpenModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
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
    const { source, alt } = this.props.data;
    return createPortal(
      <Overlay onClick={this.handleBackdropClick}>
        <OpenModal>
          <img src={source} alt={alt} />
        </OpenModal>
      </Overlay>,
      modalRoot
    );
  }
}
