import 'regenerator-runtime'; /* for async await transpile */
import '../styles/scss/main.scss';
import App from './views/app';
import swRegister from './utils/sw-register';

const hamburgerBtn = document.querySelector('.hamburger-icon');
const hamburgerMenu = document.querySelector('.hamburger-menu');
const hamburgerMenuList = document.querySelectorAll('.hamburger-menu > ul > li > a');
const header = document.querySelector('header');
const footerText = document.querySelector('.footer-text');
const notifBtn = document.querySelector('.notif-btn');
const notifIconOn = document.querySelector('.fa-bell');
const notifIconOff = document.querySelector('.fa-bell-slash');
const mainContent = document.getElementById('main-content');
const searchBtnInit = document.querySelector('.search-btn-init');
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchBgHelper = document.querySelector('.bg');
const loading = document.querySelector('.loading-indicator');
const blurBg = document.querySelector('.blur-bg');

let notifToggle = true;

notifBtn.addEventListener('click', () => {
  if (notifToggle) {
    notifIconOn.style.display = 'inline';
    notifIconOff.style.display = 'none';
    notifBtn.setAttribute('aria-label', 'notification button on');
  } else {
    notifIconOn.style.display = 'none';
    notifIconOff.style.display = 'inline';
    notifBtn.setAttribute('aria-label', 'notification button off');
  }

  notifToggle = !notifToggle;
});

function observeHeaderHeight() {
  const headerHeight = document.querySelector('header').offsetHeight + 10;
  document.documentElement.style.setProperty('--margin-top', `${headerHeight}px`);
}

const resizeHeaderHeight = new ResizeObserver(observeHeaderHeight);
resizeHeaderHeight.observe(header);

const app = new App({
  button: hamburgerBtn,
  drawer: hamburgerMenu,
  menus: hamburgerMenuList,
  content: mainContent,
});

window.addEventListener('hashchange', async () => {
  loading.classList.add('active');
  blurBg.classList.add('active');
  await app.renderPage();
  loading.classList.remove('active');
  blurBg.classList.remove('active');
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});

const newDate = new Date().getFullYear();
footerText.textContent = `Copyright © ${newDate} Leuchtend`;

searchBtn.addEventListener('click', () => {
  window.location.hash = '/search';
  app.renderPage();
});

searchBtnInit.addEventListener('click', () => {
  searchContainer.classList.add('active');
});

searchBgHelper.addEventListener('click', () => {
  searchContainer.classList.remove('active');
});
