import React from 'react';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
} from './Searchbar.styled';

const Searchbar = () => {
  return (
    <SearchbarWrapper>
      <SearchForm>
        <SearchFormButton type="submit">
          <span>Search</span>
        </SearchFormButton>

        <input
          className="Input"
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
