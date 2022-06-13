function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; // MDN
}
getRandom(0,10);

function checkString (string, long){
  if (string.length > long){
    return false;
  }
  return true;
}
checkString('Hello', 100);
