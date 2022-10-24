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
    modalImage: '',
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
    this.setState({ loading: true });

    const response = await searchImage(
      this.state.query,
      this.state.currentPage
    );
    this.setState({ images: response.hits, loading: false });
    console.log('пришло от кнопки', this.state.images);
  };

  toggleModal = img => {
    this.setState({ modalImage: img });

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));

    console.log('картинка в модалку', img);
  };

  render() {
    const { showModal, loading, images } = this.state;
    const { toggleModal, handleSubmitInput, handleChangeInput } = this;
    return (
      <AppBox>
        {showModal && (
          <Modal onClose={toggleModal} img={this.state.modalImage} />
        )}
        <Searchbar onClick={handleSubmitInput} onChange={handleChangeInput} />

        {loading && <Loader />}

        <ImageGallery items={images} openModal={this.toggleModal} />

        <Button />
      </AppBox>
    );
  }
}
