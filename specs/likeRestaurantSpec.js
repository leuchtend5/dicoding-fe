import FavoriteRestaurantDB from '../src/scripts/data/fav-restaurant-idb';
import * as TestFactories from './helpers/testFactories';

describe('Liking a restaurant', () => {
  const addDetailContainer = () => {
    document.body.innerHTML =
      '<button class="favorite-btn"><i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart"></i> Favorite</button>';
  };

  beforeEach(() => {
    addDetailContainer();
  });

  it('should show the favorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    expect(document.querySelector('[aria-label="favorite button, unfavorite"]')).toBeTruthy();
  });

  it('should not show unfavorite button when the restaurant has not been favorited before', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    expect(document.querySelector('[aria-label="favorite button, favorite"]')).toBeFalsy();
  });

  it('shoud be able to favorite a restaurant', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    document.querySelector('.favorite-btn').dispatchEvent(new Event('click'));

    const restaurantList = await FavoriteRestaurantDB.getRestaurant(1);
    expect(restaurantList).toEqual({ id: 1 });
    FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it('should not add a restaurant when its already favorited', async () => {
    await TestFactories.createLikeButton({
      id: 1,
    });

    await FavoriteRestaurantDB.putRestaurant({ id: 1 });

    document.querySelector('.favorite-btn').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurant()).toEqual([{ id: 1 }]);
    FavoriteRestaurantDB.deleteRestaurant(1);
  });

  it('should not add a restaurant when it has no id', async () => {
    await TestFactories.createLikeButton({});

    document.querySelector('.favorite-btn').dispatchEvent(new Event('click'));

    expect(await FavoriteRestaurantDB.getAllRestaurant()).toEqual([]);
  });
});
