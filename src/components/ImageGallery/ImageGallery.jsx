import React from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items }) => {
  console.log('items в галерее', items);
  return (
    <Gallery>
      {items.map(({ id, webformatURL }) => (
        <ImageGalleryItem key={id} src={webformatURL} />
      ))}
    </Gallery>
  );
};
