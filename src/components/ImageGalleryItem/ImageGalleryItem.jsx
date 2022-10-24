import React from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src, tags, onClick }) => {
  return (
    <GalleryItem>
      <GalleryItemImage src={src} alt={tags} onClick={onClick} />
    </GalleryItem>
  );
};
