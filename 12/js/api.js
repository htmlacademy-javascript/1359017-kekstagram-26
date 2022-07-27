import { showAlert} from './util.js';
import{formClose} from './form.js';
import{similarPictures} from  './make-picture.js';

const body = document.querySelector('body');
const successContainer = document.querySelector('#success').content.querySelector('.success').cloneNode(true); //переменные для отправки данных

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


const getData=async (onSuccess, onError)=>{
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then ((response)=>{
      if (response.ok) {

        return response.json();
      }
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch(() => {
      onError();
    });
};
getData(similarPictures, showAlert);


const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://26.javascript.pages.academy/kekstagram',
      {
        method: 'POST',
        body:body,
      }
    );

    if (!response.ok) {
      formClose();
      showSuccessMessageSending();
      blockSubmitButton();
      unblockSubmitButton();
      displaySendErrorMessage();
    }

    onSuccess();
  } catch (error) {
    displaySendErrorMessage();
    unblockSubmitButton();
  }
};


export{sendData};


