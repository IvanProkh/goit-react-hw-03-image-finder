import React, { Component } from 'react';

import { AppBox } from './App.styled';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';
import { Modal } from './Modal/Modal';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { searchImage } from '../api/searchApi';

console.log(searchImage());

export class App extends Component {
  state = {
    showModal: false,
    loading: false,
    query: 'cat',
    currentPage: 1,
    perPage: 12,
    images: [],
  };

  // HTTP запрос

  async componentDidMount() {
    // const response =
    // 'https://pixabay.com/api/?q=cat&page=1&key=your_key&image_type=photo&orientation=horizontal&per_page=12';
    const response = await searchImage(this.query, this.currentPage);
    this.setState({ images: response.hits, isLoader: false }, () =>
      console.log('in setState', this.state.images)
    );

    console.log('did response', response);
    console.log(this.state.images);
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
        <Searchbar />

        <button type="button" onClick={this.toggleModal}>
          Открыть
        </button>

        {loading && <Loader />}

        <ImageGallery>
          <ImageGalleryItem />
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
