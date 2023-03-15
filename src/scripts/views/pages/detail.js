import '../../component/detail-component';
import DicodingRestaurantsSource from '../../data/restaurant-source';
import API_ENDPOINT from '../../global/api-endpoint';
import UrlParser from '../../routes/url-parser';
import LikeButtonInitiator from '../../utils/like-initiator';
import FavoriteRestaurantDB from '../../data/fav-restaurant-idb';

const Detail = {
  async render() {
    return `
      <section class="restaurant-detail-container">
      </section>
    `;
  },

  async afterRender() {
    const container = document.querySelector('.restaurant-detail-container');
    const detailComponent = document.createElement('detail-component');
    const result = await this._fetchDataRestaurant();
    detailComponent.restoDetail = result;
    container.appendChild(detailComponent);

    const detailComponentElement = document.querySelector('detail-component');
    const favoriteButtonElement = detailComponent.shadowRoot.querySelector('.favorite-btn');

    this._subMenuRender(detailComponentElement);

    LikeButtonInitiator.init({
      element: favoriteButtonElement,
      restaurant: result,
      favoriteRestaurant: FavoriteRestaurantDB,
    });

    this._submitNewReview(detailComponent, result.id);
  },

  async _fetchDataRestaurant() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const result = await DicodingRestaurantsSource.fetchRestaurantById(url.id);
    return result;
  },

  _subMenuRender(container) {
    const subMenus = container.shadowRoot.querySelectorAll('.sub-menu-container > li');
    const subMenusContent = container.shadowRoot.querySelectorAll('.sub-menu');

    subMenus.forEach((menu) => {
      menu.addEventListener('click', () => {
        // change all the sub menu's color to white
        subMenus.forEach((item) => {
          item.classList.remove('active');
        });
        // remove all the content on the sub menu
        subMenusContent.forEach((item) => {
          item.classList.remove('active');
        });
        // then change clicked menu's color to destinated color
        menu.classList.add('active');
        container.shadowRoot.getElementById(`${menu.textContent}`).classList.add('active');
      });
    });
  },

  _submitNewReview(element, id) {
    const inputNameReview = element.shadowRoot.getElementById('input-name');
    const inputReview = element.shadowRoot.getElementById('input-review');
    const postReviewBtn = element.shadowRoot.getElementById('post-review');

    postReviewBtn.addEventListener('click', async () => {
      const dataReview = {
        id,
        name: inputNameReview.value,
        review: inputReview.value,
      };

      await fetch(API_ENDPOINT.REVIEW, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataReview),
      });
    });
  },
};

export default Detail;
