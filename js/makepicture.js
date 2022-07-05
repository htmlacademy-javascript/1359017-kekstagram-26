import createMockPhotos from './data.js';
const pictureListElement=document.querySelector('.pictures');

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesFragment = document.createDocumentFragment();
const similarPictures=createMockPhotos();

similarPictures.forEach (({url, comments, likes})=> {
  const pictureElement=pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureListElement.appendChild(pictureElement);
});

pictureListElement.appendChild(similarPicturesFragment);
