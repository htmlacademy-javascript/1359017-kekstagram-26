const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview= document.querySelector('.img-upload__preview img');
//const defaultScaleControlValue = scaleControlValue.value;
let currentSize=Number(scaleControlValue.value.slice(0, -1));
const defaultScaleControlValue=currentSize;

const imgUploadEffect = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectLevel = document.querySelector('.effect-level');
const effectsList = document.querySelector('.img-upload__effects');
const effectLevelSlider = document.querySelector('.effect-level__slider');


scaleControlSmaller.addEventListener('click', () => {
  if (currentSize > 25) {
    /*scaleControlValue.value = `${currentSize -= 25}%`;
    imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;*/
    changeSize(currentSize - 25);
  }
});

scaleControlBigger.addEventListener('click', () => {
  if (currentSize  < 100) {
    //scaleControlValue.value = `${currentSize  += 25}%`;
    //imgUploadPreview.style.transform = `scale(${scaleControlValue.value})`;
    changeSize(currentSize + 25);
  }
});
effectsList.addEventListener('change', changeEffect);

function resetScale () {
  //currentSize= 100;
  //scaleControlValue.value = defaultScaleControlValue;
  changeSize(defaultScaleControlValue);
  imgUploadPreview.removeAttribute('style');

}


function changeSize(newValue){
  currentSize = newValue;
  imgUploadPreview.style.transform = `scale($ {currentSize / 100} )`;
  scaleControlValue.value= `$ {currentSize} %`;
}


effectLevel.classList.add('hidden');

const optionsFromZeroToOne= {
  range: {
    min :0,
    max:1,
  },
  start:1,
  step:0.1
};

const optionsFromZeroToThree={
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


function resetEffect() {
  effectLevelSlider.setAttribute('disabled', true);
  imgUploadEffect.classList.add('hidden');
  imgUploadPreview.className = 'img-upload__preview';
  imgUploadPreview.style.filter = '';
  effectLevelValue .value = '';
};


function changeEffect  (evt) {
  const currentValue= evt.target.value;

    if (currentValue === 'none') {
      //resetEffect ();
      return resetEffect();
    }

    effectLevel.classList.remove('hidden');
    effectLevelSlider.removeAttribute('disabled', true);
    imgUploadPreview.classList.add(`effects__preview--${currentValue}`);

    effectLevelSlider.noUiSlider.updateOptions(effects [currentValue].options)

    effectLevelSlider.noUiSlider.on('update',  () => {
      effectLevelValue.value = effectLevelSlider.noUiSlider.get();

      const {filter, unit} =effects [currentValue];
      imgUploadPreview.style.filter = `${filter}${effectLevelValue.value}${unit}`;
    });
  };


effectsList.addEventListener('change', changeEffect);

export {resetScale};
