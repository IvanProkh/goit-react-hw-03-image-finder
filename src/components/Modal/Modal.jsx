import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import { Overlay, OpenModal } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', e => {
      console.log(e.code);

      if (e.code === 'Escape') {
        console.log('Escape!!!!');
        this.props.onClick();
      }
    });
  }

  render() {
    return createPortal(
      <Overlay>
        <OpenModal>
          <img src="" alt="" />
          <h1>MODAL</h1>
          <p>Lorem ipsum dolor sit amet consectetur.</p>
          <button type="button" onClose={this.props.onClick}>
            Закрыть
          </button>
          {/* {this.props.children} */}
        </OpenModal>
      </Overlay>,
      modalRoot
    );
  }
}
