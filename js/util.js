//рандомное значение
const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
getRandom(0,10);
//Длина строки
function checkString (string, long){
  if (string.length > long){
    return false;
  }
  return true;
}
checkString('Hello', 100);

//добавляем метод для генерации массива
const getRandomArrayElement = (elements) => elements [getRandom(0, elements.length - 1)];


const isEscapeKey = (evt) => evt.key === 'Escape';

const ALERT_SHOW_TIME = 5000;

function showAlert () {
  const alertContainer= document.createElement('p');
  alertContainer.style.position = 'absolute';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style. margin = 0;
  alertContainer.style.padding = '20px 3px';
  alertContainer.style.fontSize = '16px';
  alertContainer.style.textTransform = 'none';
  alertContainer.textContent = 'Ошибка загрузки фотографий других пользователей. Попробуйте перезагрузить страницу, если проблема не будет устранена, попробуйте позже.';
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}


export {getRandomArrayElement, checkString,getRandom ,isEscapeKey,showAlert};
