import '../component/card';
import '../component/like-button';
import FavoriteRestaurantDB from '../data/fav-restaurant-idb';
import { likeBtnTemplate, likedBtnTemplate } from '../views/templates/template-creator';

const showCardHelper = {
  init({ listArray, container }) {
    while (container.firstChild) {
      container.firstChild.remove();
    }

    listArray.forEach(async (item) => {
      const restoCard = document.createElement('resto-card');
      restoCard.resto = item;
      container.appendChild(restoCard);

      const likeButton = document.createElement('like-button');
      restoCard.appendChild(likeButton);

      await this._renderButton(likeButton.shadowRoot.querySelector('.btn-wrapper'), item);
    });
  },

  async _renderButton(container, item) {
    const likeBtn = container.querySelector('.like-btn');
    const likedBtn = container.querySelector('.liked-btn');

    if (await this._isRestaurantExist(item.id)) {
      likedBtnTemplate(likeBtn, likedBtn);
    } else {
      likeBtnTemplate(likeBtn, likedBtn);
    }

    this._clickButton({
      likeBtn,
      likedBtn,
      item,
    });
  },

  async _isRestaurantExist(id) {
    const restaurant = await FavoriteRestaurantDB.getRestaurant(id);
    return !!restaurant;
  },

  _clickButton({ likeBtn, likedBtn, item }) {
    likeBtn.addEventListener('click', async () => {
      await FavoriteRestaurantDB.putRestaurant(item);
      likedBtnTemplate(likeBtn, likedBtn);
    });

    likedBtn.addEventListener('click', async () => {
      await FavoriteRestaurantDB.deleteRestaurant(item.id);
      likeBtnTemplate(likeBtn, likedBtn);
    });
  },
};

export default showCardHelper;
