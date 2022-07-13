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

export {getRandomArrayElement, checkString,getRandom ,isEscapeKey};
