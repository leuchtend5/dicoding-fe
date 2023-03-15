import DicodingRestaurantsSource from '../../data/restaurant-source';
import showCardHelper from '../../utils/show-card-helper';
import '../../component/card';

const SearchResult = {
  async render() {
    return `
      <section class="search-result">
        <h2>Search Result</h2>
        <div class="search-error"></div>
        <div class="resto-card-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const searchTextField = document.querySelector('.search');
    const cardContainer = document.querySelector('.resto-card-container');

    const result = await DicodingRestaurantsSource.searchRestaurantQuery(searchTextField.value);

    if (result.length > 0) {
      showCardHelper.init({
        listArray: result,
        container: cardContainer,
      });
    } else {
      this._searchNotFound();
    }
  },

  _searchNotFound() {
    const searchError = document.querySelector('.search-error');
    searchError.textContent = 'Not Found';
  },
};

export default SearchResult;
