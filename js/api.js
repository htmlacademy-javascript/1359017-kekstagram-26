import {isEscapeKey} from './util.js';
import{formClose} from './form.js';

const body = document.querySelector('body');
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true); //переменные для отправки данных
const successButton = successContainer.querySelector('.success__button');
const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorContainer.querySelector('.error__button');
const submitButton = document.querySelector('#upload-submit');


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt) && !body.contains(errorContainer)) {
    evt.preventDefault();
    formClose();
  }
};
onPopupEscKeydown ();


const blockSubmitButton = () => {// На время выполнения запроса к серверу кнопка «Отправить» блокируется.
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};
const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};


const onClosePopupSuccess = (evt) => { // хочу закрыть окно об успешной отправке не получается
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const successContainerClick = (evt) => {
  if (evt.target === successContainer) {
    closeSuccessPopup();
  }
};

successButton.addEventListener('click', () => closeSuccessPopup());

function closeSuccessPopup () {
  successContainer.remove();
  document.addEventListener('click', successContainerClick);
  document.addEventListener('keydown', onClosePopupSuccess);
}

const showSuccessPopup = () => { // тут надо сделать открытие окна об успешной отправке
  body.append(successContainer);
  document.addEventListener('click', successContainerClick);
  document.addEventListener('keydown', onClosePopupSuccess);
};

const onSuccessSendForm = () => {
  formClose();
  showSuccessPopup();
  unblockSubmitButton();
};


const onClosePopupError = (evt) => { // закрытие окна о ошибки
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

const errorContainerClick = (evt) => {
  if (evt.target === errorContainer) {
    closeErrorPopup();
  }
};

errorButton.addEventListener('click', () => closeErrorPopup());

function closeErrorPopup () {
  errorContainer.remove();
  document.removeEventListener('click', errorContainerClick);
  document.removeEventListener('keydown', onClosePopupError);
}


/*const showErrorPopup = () => {
  body.append(errorContainer);
  document.addEventListener('click', errorContainerClick);// открытие окна об ошибке
  document.addEventListener('keydown', onClosePopupError);
};

const onErrorSendForm = () => {
  showErrorPopup();
  unblockSubmitButton();
};*/

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram/data'
    );

    if (!response.ok) {
      throw new Error ('Не получилось загрузить информацию');
    }

    const photosData = await response.json();
    onSuccess(photosData);
  } catch (error) {
    onFail('Не получилось загрузить информацию');
  }
};
const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error ('Не получилось отправить форму. Попробуйте еще раз');
    }

    onSuccess();
  } catch (error) {
    onFail('Не получилось отвправить форму. Попробуйте еще раз');
  }
};
export {getData, sendData,blockSubmitButton,onSuccessSendForm, /*onErrorSendForm*/};
