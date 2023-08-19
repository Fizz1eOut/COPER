document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabs__btn')) {
      const catalog = e.target.closest('.catalog__tabs');
      const { tabsPath } = e.target.dataset;

      const btns = catalog.querySelectorAll('.tabs__btn');
      btns.forEach((el) => {
        el.classList.remove('tabs__btn--active');
      });
      e.target.classList.add('tabs__btn--active');

      const content = catalog.querySelectorAll('.tabs__content');
      content.forEach((el) => {
        el.classList.remove('tabs__content--active');
      });
      catalog.querySelector(`[data-tabs-target="${tabsPath}"]`).classList.add('tabs__content--active');
    }
  });
});
