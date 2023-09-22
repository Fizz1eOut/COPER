/* eslint-disable */
const catalog = document.querySelectorAll('.button--catalog');
const dropdown = document.querySelectorAll('.dropdown');
catalog.forEach((el) => {
  el.addEventListener('click', () => {
    dropdown.forEach((el) => el.classList.toggle('dropdown--active'));
  })
});

const radio = document.querySelectorAll('.radio-dropdown');
const radioDropdown = document.querySelectorAll('.radio-dropdown__input');

radio.forEach((el) => {
  el.addEventListener('change', (e) => {
    if (e.target.checked) {
      radioDropdown.forEach((el) => el.classList.toggle('radio-dropdown__input-visible', e.checked));
    };

    // if (e.target.checked) {
    //   radioDropdown.forEach((el) => el.classList.add('radio-dropdown__input-visible'));
    // } else {
    //   radioDropdown.forEach((el) => el.classList.remove('radio-dropdown__input-visible'));
    // }
  });
});
