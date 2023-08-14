/* eslint-disable */
const catalog = document.querySelectorAll('.button--catalog');
const dropdown = document.querySelectorAll('.dropdown');
catalog.forEach((el) => {
  el.addEventListener('click', () => {
    dropdown.forEach((el) => el.classList.toggle('dropdown--active'));
  })
});