import CONFIG from './config';

const API_ENDPOINT = {
  ALL_RESTAURANTS: `${CONFIG.BASE_URL}/list`,
  DETAIL: (id) => `${CONFIG.BASE_URL}/detail/${id}`,
  PICTURE: (id) => `${CONFIG.BASE_IMAGE_URL}/small/${id}`,
  SEARCH_QUERY: (query) => `${CONFIG.BASE_URL}/search?q=${query}`,
  REVIEW: `${CONFIG.BASE_URL}/review`,
};

export default API_ENDPOINT;
