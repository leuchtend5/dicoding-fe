import API_ENDPOINT from '../global/api-endpoint';

class DetailComponent extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._foodListContainer = this.shadowRoot.querySelector('.food-list');
    this._drinkListContainer = this.shadowRoot.querySelector('.drink-list');
    this._reviewListContainer = this.shadowRoot.getElementById('Review');

    this._menuList(this._foodList, this._foodListContainer);
    this._menuList(this._drinkList, this._drinkListContainer);
    this._iterateReviews(this._reviewList, this._reviewListContainer);
  }

  set restoDetail(resto) {
    this._restoDetail = resto;
    this._foodList = resto.menus.foods;
    this._drinkList = resto.menus.drinks;
    this._reviewList = resto.customerReviews;
    this.render();
  }

  _restoCategory() {
    const array = this._restoDetail.categories.map((item) => item.name);
    const combineArray = array.join(', ');
    return combineArray;
  }

  _menuList(list, container) {
    this._array = list.map((item) => item.name);

    this._array.forEach((item) => {
      const liElement = document.createElement('li');
      liElement.textContent = item;
      container.appendChild(liElement);
    });
  }

  _iterateReviews(list, container) {
    this._list = list;

    this._list.forEach((review) => {
      const reviewCard = document.createElement('div');
      const reviewerName = document.createElement('p');
      const reviewerDate = document.createElement('p');
      const reviewerReview = document.createElement('p');

      reviewCard.classList.add('review-card');

      reviewerName.textContent = review.name;
      reviewerDate.textContent = review.date;
      reviewerReview.textContent = review.review;

      container.appendChild(reviewCard);
      reviewCard.appendChild(reviewerName);
      reviewCard.appendChild(reviewerDate);
      reviewCard.appendChild(reviewerReview);
    });
  }

  render() {
    this.shadowDOM.innerHTML = `
    <style>
      * {
        margin: 0;
        padding: 0;
      }

      .wrapper {
        display: flex;
        flex-direction: column;
        gap: 20px;
        justify-content: center;
        align-items: flex-start;
        margin-top: var(--margin-top, 70px);
        width: 50%;
        font-family: content-font;
      }

      .first-part {
        display: flex;
        flex-direction: column;
        gap: 10px;
        justify-content: center;
        align-items: flex-start;
        width: 100%;
      }

      .first-part .image-container {
        width: 100%;
      }

      .first-part .image-container .resto-img {
        width: 100%;
        aspect-ratio: 16/9;
        object-fit: cover;
        border-radius: 4px;
      }

      .first-part .restaurant-detail {
        width: 100%;
      }

      .first-part .restaurant-detail > div {
        display: flex;
        flex-direction: row;
        gap: 0;
        justify-content: space-between;
        align-items: center;
      }

      .first-part .restaurant-detail > div h2 {
        text-align: left;
        font-size: 1.5rem;
      }

      .first-part .restaurant-detail > div .resto-rating {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 1rem;
        color: #eeeeee;
        background-color: rgb(38, 126, 62);
        border-radius: 8px;
        padding: 3px 5px;
      }

      .first-part .restaurant-detail > div .resto-rating .fa-star {
        font-size: 0.8rem;
      }

      .first-part .restaurant-detail p {
        margin: 3px 0;
        font-size: 1rem;
        filter: brightness(85%);
      }

      .first-part .favorite-btn {
        border: 1px solid #eeeeee;
        background-color: #393e46;
        cursor: pointer;
        min-height: 44px;
        padding: 0 12px;
        border-radius: 8px;
        font-size: 1rem;
        color: #eeeeee;
      }

      .first-part .favorite-btn:hover {
        filter: brightness(75%);
      }

      .second-part {
        width: 100%;
      }

      .second-part .sub-menu-container {
        display: flex;
        flex-direction: row;
        gap: 20px;
        justify-content: flex-start;
        align-items: center;
      }

      .second-part .sub-menu-container li {
        cursor: pointer;
        list-style: none;
        min-width: 44px;
        min-height: 44px;
        display: flex;
        align-items: center;
        font-size: 1.3rem;
      }

      .second-part .sub-menu-container li.active {
        color: #a1a0a0;
      }

      .second-part .sub-menu-container li:hover {
        color: #a1a0a0;
      }

      .second-part hr {
        margin-bottom: 15px;
        height: 0.1rem;
        background-color: white;
      }

      .second-part .content-sub-menu {
        font-size: 1.1rem;
        margin-bottom: 120px;
      }

      .second-part .content-sub-menu #About,
      .second-part .content-sub-menu #Menu,
      .second-part .content-sub-menu #Review {
        display: none;
      }

      .second-part .content-sub-menu #About.active,
      .second-part .content-sub-menu #Review.active {
        display: inline;
      }

      .second-part .content-sub-menu #Menu.active {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 50px;
        padding: 0 10px;
      }

      .second-part .content-sub-menu #Review .add-review {
        display: flex;
        flex-direction: column;
        gap: 8px;
        justify-content: center;
        align-items: flex-start;
      }

      .second-part .content-sub-menu #Review .add-review input,
      .second-part .content-sub-menu #Review .add-review button {
        min-width: 44px;
        min-height: 44px;
        color: black;
        border-radius: 5px;
        border: none;
        padding: 0 5px;
      }

      .second-part .content-sub-menu #Review .add-review button {
        cursor: pointer;
        margin-bottom: 10px;
      }

      .second-part .content-sub-menu #Review .review-card {
        border-bottom: 1px solid rgb(232, 232, 232);
        padding: 10px 0;
      }

      .second-part .content-sub-menu #Review .review-card > p:nth-child(1) {
        font-weight: bold;
      }

      .second-part .content-sub-menu #Review .review-card > p:nth-child(2) {
        filter: brightness(75%);
        font-size: 0.9rem;
        margin-bottom: 8px;
      }

      @media screen and (max-width: 960px) {
        .wrapper {
          width: 65%;
          gap: 15px;
        }

        .first-part .restaurant-detail > div h2 {
          font-size: 1.3rem;
        }

        .first-part .restaurant-detail > div .resto-rating {
          gap: 2px;
          font-size: 0.9rem;
        }

        .first-part .restaurant-detail > div .resto-rating .fa-star {
          font-size: 0.7rem;
        }

        .first-part .restaurant-detail p {
          font-size: 0.9rem;
        }

        .second-part .sub-menu-container li {
          font-size: 1.2rem;
        }

        .second-part .content-sub-menu {
          margin-bottom: 90px;
        }

        .second-part .content-sub-menu #Menu.active {
          gap: 20px;
        }

        .second-part .content-sub-menu #Review .review-card > p:nth-child(2) {
          font-size: 0.8rem;
          margin-bottom: 8px;
        }
      }

      @media screen and (max-width: 540px) {
        .wrapper {
          width: 100%;
        }

        .second-part .sub-menu-container li {
          font-size: 1.1rem;
        }

        .second-part .content-sub-menu {
          font-size: 0.9rem;
          margin-bottom: 60px;
        }

        .second-part .content-sub-menu #Review .review-card {
          padding: 10px 0;
        }

        .second-part .content-sub-menu #Review .review-card > p:nth-child(2) {
          font-size: 0.7rem;
          margin-bottom: 5px;
        }
      }
    </style>

    <div class="wrapper">
      <div class="first-part">
        <div class="image-container">
          <img src="${API_ENDPOINT.PICTURE(
            this._restoDetail.pictureId,
          )}" alt="" class="resto-img" />
        </div>
        <div class="restaurant-detail">
          <div>
            <h2>${this._restoDetail.name}</h2>
            <div class="resto-rating">${
              this._restoDetail.rating
            } <i class="fa-solid fa-star"></i></div>
          </div>
          <p>${this._restoCategory()}</p>
          <p>${this._restoDetail.address}</p>
        </div>
        <button class="favorite-btn"><i class="fa-regular fa-heart"></i><i class="fa-solid fa-heart"></i> Favorite</button>
      </div>
      <div class="second-part">
        <div class="sub-menu-container">
          <li class="active">About</li>
          <li>Menu</li>
          <li>Review</li>
        </div>
        <hr />
        <div class="content-sub-menu">
          <div id="About" class="sub-menu active">
            ${this._restoDetail.description}
          </div>
          <div id="Menu" class="sub-menu">
            <div class="food">
              Food :
              <div class="food-list"></div>
            </div>
            <div class="drink">
              Drink :
              <div class="drink-list"></div>
            </div>
          </div>
          <div id="Review" class="sub-menu">
            <div class="add-review">
              <input type="text" id="input-name" placeholder="Type your name" />
              <input type="text" id="input-review" placeholder="Type your review" />
              <button id="post-review">Post Review</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute(
      'href',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css',
    );
    this.shadowDOM.appendChild(link);
  }
}

customElements.define('detail-component', DetailComponent);
