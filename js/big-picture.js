const createCommentAll = (comments, commentTemplate) => {
  const commentElements = comments.map((comment) => { //массив комментариев
    const commentElement = commentTemplate.cloneNode(true);// скопировала li
    const commentAvatarElement = commentElement.querySelector('.social__picture');
    const commentTextElement = commentElement.querySelector('.social__text');
    commentAvatarElement.src = comment.avatar;
    commentAvatarElement.alt = comment.name;
    commentTextElement.textContent = comment.message;
    return commentElement;
  });
  return commentElements;
};

const showBigPicture = (element) => {
  const bigPicture = document.querySelector('.big-picture');
  const imageElement = bigPicture.querySelector('.big-picture__img img');
  const likesElement = bigPicture.querySelector('.likes-count');
  const descriptionElement = bigPicture.querySelector('.social__caption');
  const commentsCountElement = bigPicture.querySelector('.comments-count');
  const commentsList = bigPicture.querySelector('.social__comments');
  const commentTemplate = commentsList.querySelector('.social__comment');

  imageElement.src = element.url;
  likesElement.textContent = element.likes;
  commentsCountElement.textContent = element.comments.length;
  descriptionElement.textContent = element.description;
  const commentElements = createCommentAll(element.comments, commentTemplate);
  commentsList.replaceChildren(...commentElements);
  bigPicture.classList.remove('hidden');//открыла модальное окно
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', isEscapeKey);
};
const hideBigPicture = () => {
  document.querySelector('.big-picture').classList.add('hidden');// скрыла модальное
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', isEscapeKey);
};

function isEscapeKey(evt) {
  if (evt.code === 'Escape') {
    hideBigPicture();
  }
}
export { showBigPicture, hideBigPicture, isEscapeKey};
