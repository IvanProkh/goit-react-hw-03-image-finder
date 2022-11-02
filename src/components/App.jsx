import React, { Component } from 'react';

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

  async componentDidUpdate(_, prevState) {
    const { query, currentPage } = this.state;

    if (prevState.query !== query || prevState.currentPage !== currentPage) {
      this.setState({ loading: true, showButton: true });

      await searchImage(query, currentPage)
        .then(response => {
          if (response.totalHits === 0) {
            toast.error(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            this.setState({ showButton: false });
            return;
          }
          if (response.hits.length < 12) {
            toast.info(
              "We're sorry, but you've reached the end of search results."
            );
            this.setState({ showButton: false });
          }

          return this.setState(prevState => ({
            images: [...prevState.images, ...response.hits],
            // showButton: true,
          }));
        })
        .finally(() =>
          this.setState({
            loading: false,
          })
        );
    }
  }

  handleFormSubmit = search => {
    this.setState({ query: search });

    this.setState({
      images: [],
      // showButton: false,
      // loading: true,
      currentPage: 1,
    });
  };

  // fetch = async (query ) => {
  //   const { query, currentPage } = this.state;

  // handleFormSubmit = async search => {
  //   await this.setState({ query: search });

  //   await this.setState({
  //     images: [],
  //     showButton: false,
  //     loading: true,
  //     currentPage: 1,
  //   });

  // const { query, currentPage } = this.state;

  // await searchImage(query, currentPage)
  //   .then(response => {
  //     if (response.totalHits === 0) {
  //       toast.error(
  //         'Sorry, there are no images matching your search query. Please try again.'
  //       );
  //       return;
  //     }
  //     return this.setState({
  //       images: response.hits,
  //       showButton: true,
  //       currentPage: currentPage + 1,
  //     });
  //   })
  //   .finally(() =>
  //     this.setState({
  //       loading: false,
  //     })
  //   );
  // };

  toggleModal = (source, alt) => {
    this.setState({ modalImage: source });

    this.setState({
      largeImageData: {
        source,
        alt,
      },
    });

    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  loadMore = () => {
    this.setState(prevState => ({
      currentPage: prevState.currentPage + 1,
    }));
    console.log();
  };

  render() {
    const { showModal, loading, showButton, images, largeImageData } =
      this.state;
    const { toggleModal, handleFormSubmit, loadMore } = this;

    return (
      <AppBox>
        {showModal && <Modal onClose={toggleModal} data={largeImageData} />}

        <Searchbar onSubmit={handleFormSubmit} />

        <ImageGallery items={images} openModal={toggleModal} />

        {loading && <Loader />}

        {showButton && <Button onClick={loadMore} />}

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
