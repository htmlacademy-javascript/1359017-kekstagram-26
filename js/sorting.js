import { renderPhoto } from './make-picture.js';
import { getRandom } from './util.js';

const changeFilters = (photos) => {


  const buttonDefault = document.querySelector('#filter-default');
  const buttonRandom = document.querySelector('#filter-random');
  const buttonDiscussed = document.querySelector('#filter-discussed');
  const NEW_PHOTOS_COUNT = 10;
  const PHOTO_ELEMENTS_COUNT = 25;
  const DEBOUNCE_TIMEOUT = 500;

  const similarListElement = document.querySelector('.pictures');

  const toggleFilter = function (picturesArray) {

    while (similarListElement.querySelector('.picture')) {
      similarListElement.removeChild(similarListElement.querySelector('.picture'));
    }

    const fragment = document.createDocumentFragment();

    renderPhoto(picturesArray);
    similarListElement.appendChild(fragment);
  };


  buttonDiscussed.addEventListener('click', () => {
    buttonDiscussed.classList.add('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');

    window.setTimeout( () => {
      const commentsArrayCopy = photos.slice();
      commentsArrayCopy.sort((a, b) => {
        if (a.comments.length > b.comments.length) {
          return -1;
        } else if (a.comments.length < b.comments.length) {
          return 1;
        }
        return 0;
      });
      toggleFilter(commentsArrayCopy);
    }, DEBOUNCE_TIMEOUT);

  });

  buttonDefault.addEventListener('click', () => {
    buttonDefault.classList.add('img-filters__button--active');
    buttonRandom.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');

    window.setTimeout(() => {
      toggleFilter(photos);
    }, DEBOUNCE_TIMEOUT);
  });


  const toggleFilterNew = (picturesArray) => {
    const newPhotosArray = [];
    for (let i = 1; newPhotosArray.length !== NEW_PHOTOS_COUNT; i++) {
      const newPhotosElement = picturesArray[getRandom(0, PHOTO_ELEMENTS_COUNT)];
      if (!newPhotosArray.includes(newPhotosElement)) {
        newPhotosArray.push(newPhotosElement);
      }
    }
    return newPhotosArray;
  };

  buttonRandom.addEventListener('click', () => {
    buttonRandom.classList.add('img-filters__button--active');
    buttonDefault.classList.remove('img-filters__button--active');
    buttonDiscussed.classList.remove('img-filters__button--active');

    window.setTimeout(() => {
      let commentsArrayCopy = photos.slice();
      commentsArrayCopy = toggleFilterNew(commentsArrayCopy);
      toggleFilter(commentsArrayCopy);
    }, DEBOUNCE_TIMEOUT);
  });
};

export {changeFilters};
