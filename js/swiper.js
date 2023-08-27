/* eslint-disable */
new Swiper('.product-swiper', {
  navigation: {
    nextEl: '.product__arrow.swiper-button-next',
    prevEl: '.product__arrow.swiper-button-prev',
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
    610: {
      slidesPerView: 1,
    },
    870: {
      slidesPerView: 3,
    },
    1128: {
      slidesPerView: 4,
    },
  },

  // Отступ между слайдами
  spaceBetween: 10,
  // Эффекты переключение слайдов
  // Листание
  effect: 'slide',
});
