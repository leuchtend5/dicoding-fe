import FavoriteRestaurantDB from '../src/scripts/data/fav-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Unliking a restaurant', () => {
  const addDetailContainer = () => {
    document.body.innerHTML =
      '<button class="favorite-btn"><i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart"></i> Favorite</button>';
  };

  beforeEach(async () => {
    addDetailContainer();
    await FavoriteRestaurantDB.putRestaurant({ id: 1 });
  });

  afterEach(async () => {
    await FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it('should show unfavorite button when the restaurant has been favorited', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    expect(document.querySelector('[aria-label="favorite button, favorite"]')).toBeTruthy();
  });

  it('should not show favorite button when the restaurant has been favorited', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    expect(document.querySelector('[aria-label="favorite button, unfavorite"]')).toBeFalsy();
  });

  it('should be able to remove favorite restaurant from the list', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    document.querySelector('.favorite-btn').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurant()).toEqual([]);
  });

  it('should not throw error if the unfavorite restaurant is not in the list', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    await FavoriteRestaurantDB.deleteRestaurant(1);

    document.querySelector('.favorite-btn').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurant()).toEqual([]);
  });
});
