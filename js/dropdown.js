/* eslint-disable */
const catalog = document.querySelectorAll('.button--catalog');
const dropdown = document.querySelectorAll('.dropdown');
catalog.forEach((el) => {
  el.addEventListener('click', () => {
    dropdown.forEach((el) => el.classList.toggle('dropdown--active'));
  })
});

const radio = document.querySelectorAll('.radio-dropdown');
console.log(radio);
const radioDropdown = document.querySelectorAll('.radio-dropdown__input');
console.log(radioDropdown);

radio.forEach((el) => {
  el.addEventListener('change', (e) => {
    if (e.target.checked) {
      radioDropdown.forEach((el) => el.classList.toggle('radio-dropdown__input-visible', e.checked));
    };
  });
});
