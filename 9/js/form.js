const uploadForm = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('text__hashtags');
const textDescription = document.querySelector('text__description');
const RE = /#[a-zA-z0-9]/ ;

const onPopupEscKeydown = (evt) =>{
  const userElement=evt.target ===hashTags|| evt.target ===textDescription;
  if (!userElement) {
    evt.preventDefault();
    uploadImageClose ();
    uploadForm.reset();
  }
};

function uploadImageOpen () {
  uploadOverlay .classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function uploadImageClose () {
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

uploadFile.addEventListener('input', uploadImageOpen);

uploadCancel.addEventListener('click', () => {
  uploadImageClose();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
},);

pristine.addValidator(uploadForm.querySelector('.text__hashtags'),  uniqueHashtags,  'Хэш-теги не должны повторяться.');
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), validateHashtagCount, 'Можно добавить не более 5 хэштегов');
pristine.addValidator(uploadForm.querySelector('.text__hashtags'), checkHashtagSymbols, 'Хэш-тег должен начинаться с символа #, содержать только буквы и числа.');
pristine.addValidator(uploadForm.querySelector('.text__description'), validateLength, 'длина комментария не может составлять больше 140 символов;');

function uniqueHashtags(){
  return (new Set(hashTags.value.split(' '))).size === hashTags.value.split(' ').length;
}

function validateHashtagCount(value){
  return value.split('').length <= 5;
}

function checkString (string, long){
  if (string.length > long){
    return false;
  }
  return true;
}

function checkHashtagSymbols(value){
  return RE.test(value);
}

function validateLength(value){
  return checkString(value,140);
}


uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
