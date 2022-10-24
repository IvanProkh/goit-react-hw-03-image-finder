import React from 'react';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export const Searchbar = ({ onChange, onClick }) => {
  return (
    <SearchbarWrapper>
      <SearchForm>
        <SearchFormButton
          type="submit"
          // onClick={onClick(serchImage)}
          onClick={onClick}
        >
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChange}
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};
