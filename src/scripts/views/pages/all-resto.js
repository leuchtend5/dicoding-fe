import DicodingRestaurantsSource from '../../data/restaurant-source';
import showCardHelper from '../../utils/show-card-helper';

const AllResto = {
  async render() {
    return `
      <section class="all-resto">
        <h2>Restaurant List</h2>
        <div class="filter">
          <label for="filter-by" tabindex="0"  > Filter by city : </label>
          <select name="" id="resto-cities">
            <option value="Show-all" selected>Show All</option>
            <option value="Aceh">Aceh</option>
            <option value="Bali">Bali</option>
            <option value="Balikpapan">Balikpapan</option>
            <option value="Bandung">Bandung</option>
            <option value="Gorontalo">Gorontalo</option>
            <option value="Malang">Malang</option>
            <option value="Medan">Medan</option>
            <option value="Surabaya">Surabaya</option>
            <option value="Ternate">Ternate</option>
          </select>
        </div>
        <div class="resto-card-container"></div>
      </section>
    `;
  },

  async afterRender() {
    const restoList = await DicodingRestaurantsSource.allRestaurants();
    const filterOptions = document.getElementById('resto-cities');
    const allRestoCardContainer = document.querySelector('.resto-card-container');

    showCardHelper.init({
      listArray: restoList,
      container: allRestoCardContainer,
    });

    this._filterRender({
      filterElement: filterOptions,
      arrayList: restoList,
      containerElement: allRestoCardContainer,
    });
  },

  _filterRender({ filterElement, arrayList, containerElement }) {
    filterElement.addEventListener('change', async (event) => {
      if (event.target.value === 'Show-all') {
        showCardHelper.init({
          listArray: arrayList,
          container: containerElement,
        });
      } else {
        const filteredRestaurant = await DicodingRestaurantsSource.restaurantByCity(
          event.target.value,
        );
        showCardHelper.init({
          listArray: filteredRestaurant,
          container: containerElement,
        });
      }
    });
  },
};

export default AllResto;
