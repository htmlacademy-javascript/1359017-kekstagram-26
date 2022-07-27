import { showAlert} from './util.js';
//import{formClose} from './form.js';
import {changeFilters} from './sorting.js';

const body = document.querySelector('body');
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true); //переменные для отправки данных
const filters = document.querySelector('.img-filters');
const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);

const submitFormElement = document.querySelector('.img-upload__submit');


function showSuccessMessageSending () {
  body.append(successContainer);

  const successMessage = document.querySelector('.success');
  const successInner = document.querySelector('.success__inner');
  const successTitle = document.querySelector('.success__title');

  const removeSuccessMessageOnClick = (evt) => {
    if(evt.target !== successInner && evt.target !== successTitle) {
      successMessage.remove();
      removeSuccessMessageEventListeners();
    }
  };

  const removeSuccessMessageOnEsc = (evt) => {
    if(evt.key === 'Escape') {
      successMessage.remove();
      removeSuccessMessageEventListeners ();
    }
  };

  function removeSuccessMessageEventListeners () {
    document.removeEventListener('click', removeSuccessMessageOnClick);
    document.removeEventListener('keydown', removeSuccessMessageOnEsc);
  }

  document.addEventListener('click', removeSuccessMessageOnClick);
  document.addEventListener('keydown', removeSuccessMessageOnEsc);
}

function displaySendErrorMessage () {
  body.append(errorContainer);

  const errorMessageElement = document.querySelector('.error');
  const errorInnerElement = document.querySelector('.error__inner');
  const errorTitleElement = document.querySelector('.error__title');


  const removeErrorMessageOnClick = (evt) => {
    if(evt.target !== errorInnerElement && evt.target !== errorTitleElement) {
      errorMessageElement.remove();

      removeErrorMessage ();
    }
  };

  const removeErrorMessageOnEsc = (evt) => { //удаление
    if(evt.key === 'Escape') {
      errorMessageElement.remove();

      removeErrorMessage ();
    }
  };

  function removeErrorMessage () {
    document.removeEventListener('click', removeErrorMessageOnClick);
    document.removeEventListener('keydown', removeErrorMessageOnEsc);
  }

  document.addEventListener('click', removeErrorMessageOnClick);
  document.addEventListener('keydown', removeErrorMessageOnEsc);
}


const blockSubmitButton = () => {
  submitFormElement.disabled = true;
  submitFormElement.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitFormElement.disabled = false;
  submitFormElement.textContent = 'Опубликовать';
};

const dataReceivingAddress = 'https://26.javascript.pages.academy/kekstagram/data';
const dataSendingAddress = 'https://26.javascript.pages.academy/kekstagram';

function getData(onSuccess) {
  fetch(dataReceivingAddress)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error;
    })
    .then((photos) => {
      onSuccess(photos);
      filters.style.opacity = '1';
      changeFilters(photos);
    })
    .catch(() => {
      showAlert('Отсутствует соединение с сервером, попробуйте позже...');
    });
}



function sendData(onSuccess, onFail, body) {
  fetch(dataSendingAddress,
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
}


export { getData, sendData };

