const likeBtnTemplate = (likeBtn, likedBtn) => {
  likeBtn.style.setProperty('display', 'inline');
  likedBtn.style.setProperty('display', 'none');
  likeBtn.setAttribute('aria-label', 'favorite button, not favorite');
};

const likedBtnTemplate = (likeBtn, likedBtn) => {
  likeBtn.style.setProperty('display', 'none');
  likedBtn.style.setProperty('display', 'inline');
  likedBtn.setAttribute('aria-label', 'favorite button, favorited');
};

const favoriteBtnTemplate = (container) => {
  const favoriteBtn = container.querySelector('i:nth-child(1)');
  const favoritedBtn = container.querySelector('i:nth-child(2)');
  favoriteBtn.style.setProperty('display', 'inline');
  favoritedBtn.style.setProperty('display', 'none');
  container.setAttribute('aria-label', 'favorite button, unfavorite');
};

const unFavoriteBtnTemplate = (container) => {
  const favoriteBtn = container.querySelector('i:nth-child(1)');
  const favoritedBtn = container.querySelector('i:nth-child(2)');
  favoriteBtn.style.setProperty('display', 'none');
  favoritedBtn.style.setProperty('display', 'inline');
  container.setAttribute('aria-label', 'favorite button, favorite');
};

export { likeBtnTemplate, likedBtnTemplate, favoriteBtnTemplate, unFavoriteBtnTemplate };
