import React, { Component } from 'react';

import { AppBox } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImage } from '../api/searchApi';

export class App extends Component {
  state = {
    showModal: false,
    loading: false,
    query: '',
    currentPage: 1,
    images: [],
  };

  // HTTP запрос

  async componentDidMount() {
    this.setState({ loading: true });

    const response = await searchImage(
      this.state.query,
      this.state.currentPage
    );
    this.setState({ images: response.hits, loading: false });
  }

  // if (totalHits > 0 && currentPage === 1) {
  //   Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
  //   refs.loadMoreButton.classList.toggle('is-hidden');
  // }

  // if (totalHits === 0) {
  //   Notiflix.Notify.failure(
  //     'Sorry, there are no images matching your search query. Please try again.'
  //   );
  // }

  // if (totalHits !== numOfElements) {
  //   currentPage += 1;
  //   return response;
  // }

  // if (totalHits === numOfElements && totalHits > 0) {
  //   Notiflix.Notify.failure(
  //     "We're sorry, but you've reached the end of search results."
  //   );
  //   refs.loadMoreButton.classList.toggle('is-hidden');
  // }

  // Конец запроса

  handleChangeInput = e => {
    this.setState({ query: e.currentTarget.value });
  };

  handleSubmitInput = async e => {
    e.preventDefault();

    const response = await searchImage(
      this.state.query,
      this.state.currentPage
    );
    this.setState({ images: response.hits });
    console.log('пришло от кнопки', this.state.images);
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal, loading } = this.state;
    return (
      <AppBox>
        {showModal && <Modal onClose={this.toggleModal} />}
        <Searchbar
          onClick={this.handleSubmitInput}
          onChange={this.handleChangeInput}
        />

        <button type="button" onClick={this.toggleModal}>
          Открыть
        </button>

        {loading && <Loader />}

        <ImageGallery items={this.state.images}>
          {/* <ImageGalleryItem /> */}
        </ImageGallery>

        <Button />
      </AppBox>
    );
  }
}

// const response = await axios
//   .get(`${BASE_URL}`, {
//     params: {
//       key: `${API_KEY}`,
//       q: `${this.state.nameSearch}`,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: 'true',
//       page: `${this.state.currentPage}`,
//       per_page: `${this.state.perPage}`,
//     },
//   })
//   .then(images => this.setState({ images }))
//   .finally(() => this.setState({ loading: false }));
