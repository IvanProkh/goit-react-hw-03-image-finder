import { React, Component } from 'react';
import { toast } from 'react-toastify';
import {
  SearchbarWrapper,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';

export class Searchbar extends Component {
  searchInput = document.querySelector('input');

  state = { search: '' };

  handleInputChange = e => {
    this.setState(
      {
        search: e.currentTarget.value.toLowerCase(),
      },
      () => console.log('search', this.state.search)
    );
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.search.trim() === '') {
      toast.error(
        'It looks like you want to find nothing, please check your query.'
      );
      return;
    }

    this.props.onSubmit(this.state.search);

    this.setState({ search: '' }, () =>
      console.log('search 2', this.state.search)
    );
  };

  render() {
    return (
      <SearchbarWrapper>
        <SearchForm>
          <SearchFormButton
            type="submit"
            // onClick={onClick(serchImage)}
            // onClick={this.props.onClick}
            onClick={this.handleSubmit}
          >
            <span>Search</span>
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.search}
            // onChange={this.props.onChange}
            onChange={this.handleInputChange}
          />
        </SearchForm>
      </SearchbarWrapper>
    );
  }
}
