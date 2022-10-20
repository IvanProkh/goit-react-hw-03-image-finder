import React from 'react';

import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

export const App = () => {
  return (
    <div className="App">
      <Searchbar />
      <Loader />
      <ImageGallery>
        <ImageGalleryItem>
          <Modal />
        </ImageGalleryItem>
      </ImageGallery>
      <Button />
    </div>
  );
};
