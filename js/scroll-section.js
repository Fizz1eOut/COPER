window.addEventListener('scroll', () => {
  let scrollDistance = window.scrollY;
  document.querySelectorAll('section').forEach((el, i) => {
    if (el.offsetTop - document.querySelector('.header').clientHeight <= scrollDistance) {
      document.querySelectorAll('.directions__link').forEach((item) => {
        if (item.classList.contains('active')) {
          item.classList.remove('active');
        }
      });

      document.querySelectorAll('.directions__item')[i].querySelector('.directions__link').classList.add('active');
    }
  });
});
