import { sendData } from './api.js';
import {isEscapeKey} from './util.js';
//import{blockSubmitButton,onSuccessSendForm, onErrorSendForm} from '/api.js';
const RE = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG = {
  MAX_SIZE: 19,
  MIN_SIZE: 2,
  AMOUNT: 5
};
const uploadForm = document.querySelector('.img-upload__form');
const bodyElement = document.querySelector('body');
const uploadFile = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('.text__hashtags');
const textDescription = document.querySelector('.text__description');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const unifyHashtags = (value) => {
  if (!value.length) {
    return [];
  }
  return value.trim().toLowerCase().split(' ');
};

const isArrayUnique = (array)=> new Set(array).size === array.length;

const validateDescription = (value) => value.length <= 140;

uploadFile.addEventListener('change', openModal);
uploadFile.addEventListener('submit', submitForm);
uploadForm.addEventListener ('reset', closeModal);


pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => elem.startsWith('#')), 'хэш-тег начинается с символа # (решётка)', 2, false);
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => RE.test(elem)), 'Хэштег может состоять только из букв и цифр без пробелов, хэш-теги разделяются пробелами');
pristine.addValidator(hashTags, (value) => unifyHashtags(value).every((elem) => elem.length >= HASHTAG.MIN_SIZE), 'Минимальная длина одного хэш-тега-2 символа, включая #');
pristine.addValidator(hashTags, (value) =>  unifyHashtags(value).every((elem) => elem.length <= HASHTAG.MAX_SIZE), 'максимальная длина одного хэш-тега 20 символов, включая решётку ');
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).length <=  HASHTAG.AMOUNT, 'Можно добавить не более 5 хэштегов');

pristine.addValidator(hashTags, (value)=>  isArrayUnique(unifyHashtags(value)), 'один и тот же хэш-тег не может быть использован дважды;');
pristine.addValidator(textDescription, validateDescription, 'Длина комментария не может составлять больше 140 символов');

function openModal(){
  uploadOverlay.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeModal(){
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  pristine.reset();

}
function onPopupEscKeydown (evt) {
  const{activeElement}=document;
  if(hashTags === activeElement || textDescription=== activeElement) {
    return evt.stopPropagation();
  }
  if(isEscapeKey(evt)){
    evt.preventDefault();
    uploadForm.reset();
  }
}

function submitForm(evt) {
  evt.preventDefault();
  const isImgUploadFormValid = pristine.validate();

  if(isImgUploadFormValid){
    //blockSubmitButton();//
    sendData(); //
    uploadForm.reset();
  }
}
const onUploadFormSubmit = (evt)=> {
  evt.preventDefault();
  pristine.validate();
};

function formClose(){
  uploadOverlay.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  uploadCancel.addEventListener('click', formClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm .reset();
  pristine.reset();
}
formClose();

uploadForm.addEventListener('submit', onUploadFormSubmit);
uploadForm.addEventListener('reset', closeModal);
