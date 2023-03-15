import FavoriteRestaurantDB from '../../data/fav-restaurant-idb';
import showCardHelper from '../../utils/show-card-helper';

const Favorite = {
  async render() {
    return `
      <section class="favorite-resto">
        <h2>Favorite Restaurants</h2>
        <div class="favorite-error"></div>
        <div class="resto-card-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const restaurants = await FavoriteRestaurantDB.getAllRestaurant();
    const allRestoCardContainer = document.querySelector('.resto-card-container');
    const favoriteErrorMessage = document.querySelector('.favorite-error');

    if (restaurants.length === 0) {
      favoriteErrorMessage.innerHTML = "You haven't added any favorites yet";
    } else {
      showCardHelper.init({
        listArray: restaurants,
        container: allRestoCardContainer,
      });
    }
  },
};

export default Favorite;
