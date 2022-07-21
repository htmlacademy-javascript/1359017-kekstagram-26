const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const ImgUploadPreview= document.querySelector('.img-upload__preview img');
const defaultScaleControlValue = scaleControlValue.value;
let currentSize=100;


const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.effects__list');
const effectLevelSlider = document.querySelector('.effect-level__slider');


scaleControlSmaller.addEventListener('click', () => {
  if (currentSize > 25) {
    scaleControlValue.value = `${currentSize -= 25}%`;
    ImgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentSize  < 100) {
    scaleControlValue.value = `${currentSize  += 25}%`;
    ImgUploadPreview.style.transform = `scale(${currentSize.value})`;
  }
});
function resetScale () {
  currentSize= 100;
  scaleControlValue.value = defaultScaleControlValue;
  ImgUploadPreview.removeAttribute('style');
}
resetScale();


effectLevel.classList.add('hidden');
const effects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },

  sepia: {
    filter: 'sepia',
    unit: '',
    options: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
  },
  marvin: {
    filter: 'invert',
    unit: '%',
    options: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
  },
  phobos: {
    filter: 'blur',
    unit: 'px',
    options: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
  heat: {
    filter: 'brightness',
    unit: '',
    options: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
  },
};
noUiSlider.create(effectLevelSlider, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

const noneEffect = () => {
  effectLevelSlider.setAttribute('disabled', true);
  imgUploadEffect.classList.add('hidden');
  ImgUploadPreview.className = 'img-upload__preview';
  ImgUploadPreview.style.filter = '';
  effectLevelValue .value = '';
};


const changeEffect = (evt) => {

  const selectedEffect = evt.target.value;

  if (selectedEffect === 'none') {
    noneEffect();
  } else {
    effectLevelSlider.removeAttribute('disabled');
    imgUploadEffect .classList.remove('hidden');
    ImgUploadPreview.className = 'img-upload__preview';
    ImgUploadPreview.classList.add(`effects__preview--${selectedEffect}`);
    effectLevelSlider .noUiSlider.updateOptions(effects[selectedEffect].options);
  }
};
effectsList.addEventListener('change', changeEffect);

export {resetScale};
