import React, { Component } from 'react';

import { AppBox } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
// import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = { showModal: false };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;
    return (
      <AppBox>
        {showModal && <Modal onClick={this.toggleModal} />}
        <Searchbar />

        <button type="button" onClick={this.toggleModal}>
          Открыть
        </button>

        <Loader />

        <ImageGallery>
          {/* <ImageGalleryItem>
        </ImageGalleryItem> */}
        </ImageGallery>

        <Button />
      </AppBox>
    );
  }
}

// export default App;

// export const App = () => {
//   return (

//   );
// };
