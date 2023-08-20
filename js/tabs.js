document.addEventListener('DOMContentLoaded', () => {
  function createBtns(catalog) {
    const btns = catalog.querySelectorAll('.tabs__btn');
    btns.forEach((el) => {
      el.classList.remove('tabs__btn--active');
    });
    return btns;
  }

  function createContent(catalog) {
    const content = catalog.querySelectorAll('.tabs__content');
    content.forEach((el) => {
      el.classList.remove('tabs__content--active');
    });
    return content;
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabs__btn')) {
      const catalog = e.target.closest('.catalog__tabs');
      const { tabsPath } = e.target.dataset;

      createBtns(catalog);

      e.target.classList.add('tabs__btn--active');

      createContent(catalog);

      catalog.querySelector(`[data-tabs-target="${tabsPath}"]`).classList.add('tabs__content--active');
    }
  });
});
