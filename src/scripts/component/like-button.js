class LikeButton extends HTMLElement {
  constructor() {
    super();
    this.shadowDOM = this.attachShadow({ mode: 'open' });

    this.render();
  }

  render() {
    this.shadowDOM.innerHTML = `
      <style>
        .like-btn,
        .liked-btn {
          display: inline;
          position: absolute;
          right: 0;
          top: 0;
          border-radius: 50%;
          border: none;
          background-color: transparent;
          min-width: 44px;
          min-height: 44px;
          padding: 0;
          cursor: pointer;
        }

        .liked-btn {
          display: none;
        }

        .fa-heart::before {
          position: relative;
          top: 3px;
        }

        .fa-heart {
          width: 20px;
          height: 20px;
          background-color: white;
          border-radius: 50%;
        }

      </style>

      <div class="btn-wrapper">
        <button class="like-btn"><i class="fa-regular fa-heart"></i></button>
        <button class="liked-btn"><i class="fa-solid fa-heart"></i></button>
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

customElements.define('like-button', LikeButton);
