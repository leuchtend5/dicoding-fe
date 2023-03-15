const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorite');
});

Scenario('showing empty favorited restaurants', ({ I }) => {
  I.see("You haven't added any favorites yet", '.favorite-error');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see("You haven't added any favorites yet", '.favorite-error');

  I.amOnPage('/#/restaurants');
  I.waitForElement('resto-card', 10);

  const firstRestaurant = locate('resto-card').first();
  const firstRestaurantName = await I.grabTextFrom('pierce/.details > div > p:nth-child(1)');
  I.click(firstRestaurant);

  // I CLICK FAVORITE BUTTON ON DETAIL PAGE
  I.wait(2);
  I.click('pierce/.favorite-btn');

  I.amOnPage('/#/favorite');
  I.seeElement('resto-card');

  const favoriteRestaurantName = await I.grabTextFrom('pierce/.details > div > p:nth-child(1)');
  assert.strictEqual(firstRestaurantName, favoriteRestaurantName);
});

Scenario('unliking one restaurant', async ({ I }) => {
  I.see("You haven't added any favorites yet", '.favorite-error');

  I.amOnPage('/#/restaurants');
  I.waitForElement('resto-card', 10);

  // I CLICK SMALL FAVORITE BUTTON ON RESTAURANT CARD
  I.click('pierce/.like-btn');

  I.amOnPage('/#/favorite');
  I.seeElement('resto-card');

  // I CLICK SMALL UNFAVORITE BUTTON ON RESTAURANT CARD
  I.click('pierce/.liked-btn');

  I.refreshPage();
  I.see("You haven't added any favorites yet", '.favorite-error');
});

Scenario('add new review', async ({ I }) => {
  I.see("You haven't added any favorites yet", '.favorite-error');

  I.amOnPage('/#/restaurants');
  I.waitForElement('resto-card', 10);

  I.click('resto-card');

  I.wait(1);
  I.click('pierce/.sub-menu-container li:nth-child(3)');

  const name = 'Budi';
  const review = 'Enak';

  I.fillField('pierce/#input-name', `${name}`);
  I.fillField('pierce/#input-review', `${review}`);
  I.click('pierce/#post-review');

  I.wait(3);
  I.refreshPage();
  I.wait(2);

  I.click('pierce/.sub-menu-container li:nth-child(3)');

  const userName = await I.grabTextFrom(
    'pierce/#Review > .review-card:last-child > p:nth-child(1)',
  );
  const userReview = await I.grabTextFrom(
    'pierce/#Review > .review-card:last-child > p:nth-child(3)',
  );

  assert.strictEqual(name, userName);
  assert.strictEqual(review, userReview);
});
