/* eslint-disable */
new Swiper('.new-products', {
  navigation: {
    nextEl: '.new-products__arrow.swiper-button-next',
    prevEl: '.new-products__arrow.swiper-button-prev',
  },
  // Управление клавиатурой
  keyboard: {
    // включить/выключить
    enabled: true,
    // Вкл/Выкл только когда слайдер в пределах вьюпорта
    onlyInViewport: true,
    // включить/выключить управление клавиатурой PageUp, pageDown
    pageUpDown: true,
  },

  // Автовысота
  autoHeihgt: true,
  // Количство слайдов для показа
  slidesPerView: 4,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    320: {
      slidesPerView: 3,
    },
    1058: {
      slidesPerView: 4,
    },
    1317: {
      slidesPerView: 5,
    },
  },

  // Отступ между слайдами
  spaceBetween: 10,
  // Эффекты переключение слайдов
  // Листание
  effect: 'slide',
});
