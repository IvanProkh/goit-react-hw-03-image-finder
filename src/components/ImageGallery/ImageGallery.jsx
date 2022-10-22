import React from 'react';
import { Gallery } from './ImageGallery.styled';

export const ImageGallery = ({ children }) => {
  console.log(children);
  return (
    <Gallery>
      {children}
      {/* {items.map(({ }) => (
        <li key={id}>
          <span>{name} :</span>
          <span>{number}</span>
        </li>
      ))} */}
    </Gallery>
  );
};
