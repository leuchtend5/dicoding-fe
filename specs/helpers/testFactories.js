import LikeButtonInitiator from '../../src/scripts/utils/like-initiator';
import FavoriteRestaurantDB from '../../src/scripts/data/fav-restaurant-idb';

const createLikeButton = async (restaurant) => {
  await LikeButtonInitiator.init({
    element: document.querySelector('.favorite-btn'),
    restaurant,
    favoriteRestaurant: FavoriteRestaurantDB,
  });
};

export { createLikeButton };
