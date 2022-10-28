import React, { Component } from 'react';
// import Notiflix from 'notiflix';

import { AppBox } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImage } from '../api/searchApi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export class App extends Component {
  state = {
    showModal: false,
    loading: false,
    showButton: false,
    query: '',
    currentPage: 1,
    images: [],
    largeImageData: {},
  };

  // HTTP запрос

  // async componentDidMount() {
  //   this.setState({ loading: true });

  //   const response = await searchImage(
  //     this.state.query,
  //     this.state.currentPage
  //   );
  //   this.setState({ images: response.hits, loading: false });
  // }

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

  handleFormSubmit = async search => {
    await this.setState({ query: search });

    this.setState({ images: [], showButton: false });

    const { query, currentPage } = this.state;

    this.setState({ loading: true });

    const response = await searchImage(query, currentPage);

    if (response.totalHits === 0) {
      this.setState({ loading: false });
      toast.error(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    this.setState({
      images: response.hits,
      loading: false,
      showButton: true,
      currentPage: currentPage + 1,
    });
  };

  toggleModal = (source, alt) => {
    this.setState({ modalImage: source });

    this.setState(
      {
        largeImageData: {
          source,
          alt,
        },
      },
      () => console.log('data', this.state.largeImageData)
    );

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMoreImages = async () => {
    const { query, currentPage } = this.state;

    const response = await searchImage(query, currentPage);
    await this.setState({
      images: response.hits,
      loading: false,
      currentPage: currentPage + 1,
    });
  };

  render() {
    const { showModal, loading, showButton, images, largeImageData } =
      this.state;
    const { toggleModal, handleFormSubmit } = this;

    return (
      <AppBox>
        {showModal && <Modal onClose={toggleModal} data={largeImageData} />}
        {/* <Searchbar onClick={handleSubmitInput} onChange={handleChangeInput} /> */}
        <Searchbar onSubmit={handleFormSubmit} />

        {loading && <Loader />}

        <ImageGallery items={images} openModal={this.toggleModal} />

        {showButton && <Button onClick={this.loadMoreImages} />}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AppBox>
    );
  }
}
