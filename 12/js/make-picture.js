import createMockPhotos from './data.js';
import { showBigPicture, hideBigPicture } from './big-picture.js';

const picture=document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPictures=createMockPhotos();
const closeBigPictureButtonElement = document.getElementById('picture-cancel');
const similarPicturesFragment = document.createDocumentFragment();
closeBigPictureButtonElement.addEventListener('click', () => {
  hideBigPicture();
});


similarPictures.forEach (({url, comments, likes})=> {
  const pictureElement=pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  similarPicturesFragment.appendChild(pictureElement);
  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showBigPicture({url, comments, likes});
  });
});

picture.appendChild(similarPicturesFragment);

export{similarPictures};
