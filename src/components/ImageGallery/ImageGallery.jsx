import React from 'react';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export const ImageGallery = ({ items, openModal }) => {
  const imageOpen = e => {
    console.log('таргет айди', e.target.id);
    console.log('айди в айтемах', items.id);
    console.log(items.find(item => item.webformatURL === e.target.src));

    const currentImage = items.find(item => item.webformatURL === e.target.src);
    openModal(currentImage.largeImageURL, currentImage.tags);
  };

  // console.log('items в галерее', items);
  return (
    <Gallery>
      {items.map(({ id, webformatURL, tags, largeImageURL }) => (
        <ImageGalleryItem
          key={id}
          id={id}
          src={webformatURL}
          tags={tags}
          onClick={imageOpen}
        />
      ))}
    </Gallery>
  );
};
