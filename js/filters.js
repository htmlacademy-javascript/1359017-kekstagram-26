const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const previewWrapper = document.querySelector('.img-upload__preview');
const preview = previewWrapper.querySelector('img');

fileChooser.addEventListener('change', () => {
  preview.src = '';
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it)
  );

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      preview.src = reader.result;
    });

    reader.readAsDataURL(file);
  }
});
