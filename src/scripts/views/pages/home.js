import showCardHelper from '../../utils/show-card-helper';
import DicodingRestaurantsSource from '../../data/restaurant-source';

const Home = {
  async render() {
    return `
      <section class="first-section">
        <picture>
          <source type="image/webp" media="(max-width: 540px)" srcset="./images/heros/hero-image_1-small.webp">
          <source type="image/jpeg" media="(max-width: 540px)" srcset="./images/heros/hero-image_1-small.jpg">
          <source type="image/webp" srcset="./images/heros/hero-image_1.webp">
          <img src="./images/heros/hero-image_1.jpg" alt="hero image" />
        </picture>
        <article class="welcome-text">
          <p tabindex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit. At vel omnis, architecto corrupti eligendi incidunt</p>
          <p tabindex="0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
        </article>
      </section>
      <section class="second-section">
        <article>
          <h2>Our History</h2>
          <div class="history-container">
            <picture>
              <source type="image/webp" media="(max-width: 540px)" srcset="./images/second_section-small.webp">
              <source type="image/jpeg" media="(max-width: 540px)" srcset="./images/second_section-small.jpg">
              <source type="image/webp" srcset="./images/second_section.webp">
              <img src="./images/second_section.png" alt="history image" />
            </picture>
            <p tabindex="0">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore ex asperiores delectus, deserunt quidem ab dolore. Omnis rem error
              consequatur vitae ea culpa dicta, suscipit velit porro. Id, hic numquam.
            </p>
          </div>
        </article>
      </section>
      <section class="third-section">
        <h2 tabindex="0">Recommended Restaurant</h2>
        <div class="container" tabindex="-1"></div>
        <button aria-label="See all restaurants" class="see-all-btn">See All →</button>
      </section>
    `;
  },

  async afterRender() {
    const cardContainer = document.querySelector('.container');
    const recomRestoList = await DicodingRestaurantsSource.recommendedRestaurant();

    showCardHelper.init({
      listArray: recomRestoList,
      container: cardContainer,
    });

    this._seeAllBtnFunction();
  },

  _seeAllBtnFunction() {
    const seeAllBtn = document.querySelector('.see-all-btn');

    seeAllBtn.addEventListener('click', () => {
      window.location.hash = '/restaurants';
    });
  },
};

export default Home;
