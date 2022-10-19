import React from 'react';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <SearchForm>
        <SearchFormButton type="submit">
          <span>Search</span>
        </SearchFormButton>

        <SearchFormInput
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </SearchForm>
    </SearchbarWrapper>
  );
};

export default Searchbar;
