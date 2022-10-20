import React from 'react';

import { Overlay, OpenModal } from './Modal.styled';

export const Modal = ({ onClick }) => {
  return (
    <Overlay>
      <OpenModal>
        <img src="" alt="" />
        <h1>MODAL</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ab, hic
          numquam iure asperiores commodi officia voluptatem, sint odit ut
          doloribus vitae illo, sapiente quae rem! Maiores aperiam sed quod
          tempore.
        </p>
        <button type="button" onClick={onClick}>
          Закрыть
        </button>
        {/* {this.props.children} */}
      </OpenModal>
    </Overlay>
  );
};
