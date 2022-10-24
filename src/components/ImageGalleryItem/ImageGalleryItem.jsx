import React from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ src }) => {
  console.log(src);
  return (
    <GalleryItem>
      <GalleryItemImage src={src} alt="шото" />
    </GalleryItem>
  );
};
