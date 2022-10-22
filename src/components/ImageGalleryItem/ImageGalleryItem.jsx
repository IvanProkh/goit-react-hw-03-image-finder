import React from 'react';

import { GalleryItem, GalleryItemImage } from './ImageGalleryItem.styled';

export const ImageGalleryItem = () => {
  return (
    <div>
      <GalleryItem>
        <GalleryItemImage
          src="https://klike.net/uploads/posts/2019-05/1556708032_1.jpg"
          alt="шото"
        />
      </GalleryItem>
      <GalleryItem>
        <GalleryItemImage
          src="https://klike.net/uploads/posts/2019-05/1556708032_1.jpg"
          alt="шото"
        />
      </GalleryItem>
    </div>
  );
};
