import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import API_ENDPOINT from '../global/api-endpoint';

class Card extends HTMLElement {
  constructor() {
    super();
  }

  set resto(resto) {
    this._resto = resto;
    this.render();
  }

  render() {
    this.innerHTML = `
      <style>
        a {
          text-decoration: none;
        }

        a:visited,
        a:link {
          color: #eeeeee;
        }

        .img-container > img {
          border-radius: 6px;
          width: 100%;
          aspect-ratio: 16 / 10;
          object-fit: cover;
        }

        .details {
          font-family: content-font;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }

        .details p {
          margin: 0;
        }

        .details > div {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .details > p {
          font-size: 0.9rem;
          filter: brightness(75%);
        }

        .details > div p:nth-child(1) {
          font-weight: bold;
          font-size: 1.1rem;
        }

        .details > div p:nth-child(2) {
          display: flex;
          align-items: center;
          gap: 2px;
          font-size: 0.8rem;
          color: #eeeeee;
          background-color: rgb(38, 126, 62);
          border-radius: 8px;
          padding: 3px 5px;
        }

        .fa-star {
          font-size: 0.5rem;
        }
      </style>

      <a href="#/detail/${this._resto.id}">
        <div class="img-container">
          <img class="resto-img lazyload" data-src="${API_ENDPOINT.PICTURE(
            this._resto.pictureId,
          )}"  alt="restaurant-image" tabindex="0" />
        </div>
        <div class="details">
          <div>
            <p>${this._resto.name}</p>
            <p>
              ${this._resto.rating} <i class="fa-solid fa-star"></i>
            </p>
          </div>
          <p>${this._resto.city}</p>
        </div>
      </a>
    `;
  }
}

customElements.define('resto-card', Card);
