import API_ENDPOINT from '../global/api-endpoint';

class DicodingRestaurantsSource {
  static async allRestaurants() {
    const response = await fetch(API_ENDPOINT.ALL_RESTAURANTS);
    const responseJson = await response.json();
    const result = responseJson.restaurants;
    return result;
  }

  static async recommendedRestaurant() {
    const result = await this.allRestaurants();
    const sortResultByRating = result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
    const sliceResult = sortResultByRating.slice(0, 4); // I only show four highest rating restaurant as recommendation
    return sliceResult;
  }

  static async restaurantByCity(city) {
    const result = await this.allRestaurants();
    const filteredRestaurant = result.filter((resto) => resto.city === `${city}`);
    return filteredRestaurant;
  }

  static async searchRestaurantQuery(query) {
    const response = await fetch(API_ENDPOINT.SEARCH_QUERY(query));
    const responseJson = await response.json();
    const result = responseJson.restaurants;
    return result;
  }

  static async fetchRestaurantById(id) {
    const response = await fetch(API_ENDPOINT.DETAIL(id));
    const responseJson = await response.json();
    const result = responseJson.restaurant;
    return result;
  }
}

export default DicodingRestaurantsSource;
