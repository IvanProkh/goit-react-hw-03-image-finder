import React from 'react';
import { ButtonLoadMore } from './Button.styled';

export const Button = ({ onClick }) => {
  return <ButtonLoadMore onClick={onClick}>Load more</ButtonLoadMore>;
};
