const DrawerInitiator = {
  init({ button, drawer, menus }) {
    let hamburgerToggle = true;

    button.addEventListener('click', (event) => {
      if (hamburgerToggle) {
        this._toggleDrawer(event, drawer);
      } else {
        this._closeDrawer(event, drawer);
      }

      hamburgerToggle = !hamburgerToggle;
    });

    menus.forEach((menu) => {
      menu.addEventListener('click', (event) => {
        this._closeDrawer(event, drawer);

        hamburgerToggle = !hamburgerToggle;
      });
    });
  },

  _toggleDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.add('active');
  },

  _closeDrawer(event, drawer) {
    event.stopPropagation();
    drawer.classList.remove('active');
  },
};

export default DrawerInitiator;
