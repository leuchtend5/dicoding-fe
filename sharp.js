const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const target = {
  heros: path.resolve(__dirname, 'dist/images/heros'),
  history: path.resolve(__dirname, 'dist/images'),
};

const destination = {
  heros: path.resolve(__dirname, 'dist/images/heros'),
  history: path.resolve(__dirname, 'dist/images'),
};

fs.readdirSync(target.heros).forEach((image) => {
  sharp(`${target.heros}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination.heros}/${image.split('.').slice(0, -1).join('.')}-small.jpg`,
      ),
    );
  sharp(`${target.heros}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination.heros}/${image.split('.').slice(0, -1).join('.')}-small.webp`,
      ),
    );
});

fs.readdirSync(target.history).forEach((image) => {
  sharp(`${target.history}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination.history}/${image.split('.').slice(0, -1).join('.')}-small.png`,
      ),
    );
  sharp(`${target.history}/${image}`)
    .resize(480)
    .toFile(
      path.resolve(
        __dirname,
        `${destination.history}/${image.split('.').slice(0, -1).join('.')}-small.webp`,
      ),
    );
});
