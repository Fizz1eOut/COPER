/* eslint-disable */
const modalBtns = document.querySelectorAll('.modal-btn');
const modalOverlay = document.querySelector('.modal-overlay');
const modals = document.querySelectorAll('.modal');
const buttonOff = document.querySelectorAll('.button-off')

modalBtns.forEach((el) => {
  el.addEventListener('click', (e) => {
    lockScroll();
    const path = e.target.getAttribute('data-path'); // находим атрибуты

    modals.forEach((modal) => {
      modal.classList.remove('modal--visible'); // при клике на вторую кнопку удаляет у первой класс
    });

    document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible'); // добавляем класс по атрибуту
    modalOverlay.classList.add('modal-overlay--visible');
  });
});

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) {
    unlockScroll();
    modalOverlay.classList.remove('modal-overlay--visible');
    modals.forEach((el) => {
      el.classList.remove('modal--visible');
    });
  }
});
buttonOff.forEach((el) => {
  el.addEventListener('click', (e) => {
    unlockScroll();
    modalOverlay.classList.remove('modal-overlay--visible');
      modals.forEach((el) => {
        el.classList.remove('modal--visible');
      });
})
});