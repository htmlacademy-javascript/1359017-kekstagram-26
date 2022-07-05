
const thumbnails=document.querySelectorAll('.picture');
const fullPicture=document.querySelector('.big-picture');


fullPicture.classList.remove('hidden');
const fullPictureScreen = fullPicture.querySelector('.big-picture__img img');
const likesCount= fullPicture.querySelector('.likes-count');
const commentsCount = fullPicture.querySelector('.comments-count');
const socialComments=fullPicture.querySelector('.social__comments');
const pictureDescription = fullPicture.querySelector('.social__caption');
const fullCloseButton =fullPicture.querySelector('.big-picture__cancel');

fullCloseButton .addEventListener('click', function (evt) {
  evt.preventDefault();
  fullPicture.remove('picture');
});

const addThumbnailClickHandler=function(thumbnail, URL){
  thumbnail.addEventListener('click', function () {
    fullPicture.src = URL;
    likesCount.textContent = thumbnail.querySelector('.picture__likes').textContent;
    commentsCount.textContent = thumbnail.querySelector('.picture__comments').textContent;
  });
};
for (var i = 0; i < thumbnails.length; i++) {
  addThumbnailClickHandler(thumbnails[i], URL[i]);
}
