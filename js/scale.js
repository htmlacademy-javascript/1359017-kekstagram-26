const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview= document.querySelector('.img-upload__preview img');

let currentSize=Number(scaleControlValue.value.slice(0, -1));

const defaultScaleControlValue=currentSize;

const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider');


scaleControlSmaller.addEventListener('click', () => {
  if (currentSize > 25) {
    changeSize(currentSize - 25);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentSize  < 100) {
    changeSize(currentSize + 25);
  }
});
effectsList.addEventListener('change', changeEffect);

function resetScale () {
  changeSize(defaultScaleControlValue);
  imgUploadPreview.removeAttribute('style');

}


function changeSize(newValue){
  currentSize = newValue;
  imgUploadPreview.style.transform = `scale(${currentSize / 100} )`;
  scaleControlValue.value= `${currentSize} %`;
}


effectLevel.classList.add('hidden');

const OPTIONS_FROM_ZERO_TO_ONE= {
  range: {
    min :0,
    max:1,
  },
  start:1,
  step:0.1
};

const OPTIONS_FROM_ZERO_TO_THREE={
  range: {
    min :0,
    max:3,
  },
  start:3,
  step:0.1
};


const effects = {
  chrome: {
    filter: 'grayscale',
    unit: '',
    options: OPTIONS_FROM_ZERO_TO_ONE,
  },

  sepia: {
    filter: 'sepia',
    unit: '',
    options: OPTIONS_FROM_ZERO_TO_ONE,
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
    options: OPTIONS_FROM_ZERO_TO_THREE,
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
  ...OPTIONS_FROM_ZERO_TO_ONE,
  connect: 'lower',
});


function resetEffect() {
  effectLevelSlider.setAttribute('disabled', true);
  imgUploadEffect.classList.add('hidden');
  imgUploadPreview.removeAttribute ('class');
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = '';
  effectLevelValue .value = '';
}


function changeEffect  (evt) {
  const currentValue= evt.target.value;

  if (currentValue === 'none') {
    return resetEffect();
  }

  effectLevel.classList.remove('hidden');
  effectLevelSlider.removeAttribute('disabled');
  imgUploadPreview.classList.add(`effects__preview--${currentValue}`);

  effectLevelSlider.noUiSlider.updateOptions(effects [currentValue].options);

  effectLevelSlider.noUiSlider.on('update',  () => {
    effectLevelValue.value = effectLevelSlider.noUiSlider.get();

    const {filter, unit} =effects [currentValue];
    imgUploadPreview.style.filter = `${filter}(${effectLevelValue.value}${unit})`;
  });
}


effectsList.addEventListener('change', changeEffect);

export {resetScale};
