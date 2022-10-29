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

    this.setState({ images: [], showButton: false, loading: true });

    const { query, currentPage } = this.state;

    await searchImage(query, currentPage)
      .then(response => {
        if (response.totalHits === 0) {
          toast.error(
            'Sorry, there are no images matching your search query. Please try again.'
          );
          return;
        }
        return this.setState(
          {
            images: response.hits,
            showButton: true,
            currentPage: currentPage + 1,
          },
          () => console.log('response', response)
        );
      })
      .finally(() =>
        this.setState({
          loading: false,
        })
      );
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

    this.setState({ loading: true });

    await searchImage(query, currentPage)
      .then(response => {
        if (response.hits.length < 12) {
          toast.info(
            "We're sorry, but you've reached the end of search results."
          );
          this.setState({ showButton: false });
        }

        return this.setState(
          {
            images: response.hits,
            loading: false,
            currentPage: currentPage + 1,
          },
          () => console.log('response', response.hits)
        );
      })
      .finally(() =>
        this.setState({
          loading: false,
        })
      );
  };

  render() {
    const { showModal, loading, showButton, images, largeImageData } =
      this.state;
    const { toggleModal, handleFormSubmit, loadMoreImages } = this;

    return (
      <AppBox>
        {showModal && <Modal onClose={toggleModal} data={largeImageData} />}

        <Searchbar onSubmit={handleFormSubmit} />

        <ImageGallery items={images} openModal={toggleModal} />

        {loading && <Loader />}

        {showButton && <Button onClick={loadMoreImages} />}

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
