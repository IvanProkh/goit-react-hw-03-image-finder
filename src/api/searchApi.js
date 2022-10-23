import axios from 'axios';

export async function searchImage(query, page) {
  const searchParams = new URLSearchParams({
    key: '28416267-980e6e5ab3caaf003a8a6cf19',
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 12,
    page,
  });
  const images = await axios.get(`https://pixabay.com/api/?${searchParams}`);
  console.log(images.data);
  return images.data;
}
