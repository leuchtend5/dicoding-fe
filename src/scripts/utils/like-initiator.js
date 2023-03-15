import { favoriteBtnTemplate, unFavoriteBtnTemplate } from '../views/templates/template-creator';

const LikeButtonInitiator = {
  async init({ element, restaurant, favoriteRestaurant }) {
    this._element = element;
    this._restaurant = restaurant;
    this._favoriteRestaurant = favoriteRestaurant;

    await this._renderButton();
  },

  async _renderButton() {
    const { id } = this._restaurant;

    if (await this._isRestaurantExist(id)) {
      this._unFavoriteButton();
    } else {
      this._favoriteButton();
    }
  },

  async _isRestaurantExist(id) {
    const restaurant = await this._favoriteRestaurant.getRestaurant(id);
    return !!restaurant;
  },

  _favoriteButton() {
    favoriteBtnTemplate(this._element);

    this._element.addEventListener('click', async () => {
      await this._favoriteRestaurant.putRestaurant(this._restaurant);
      this._renderButton();
    });
  },

  _unFavoriteButton() {
    unFavoriteBtnTemplate(this._element);

    this._element.addEventListener('click', async () => {
      await this._favoriteRestaurant.deleteRestaurant(this._restaurant.id);
      this._renderButton();
    });
  },
};

export default LikeButtonInitiator;
