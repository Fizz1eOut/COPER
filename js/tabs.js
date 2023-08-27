document.addEventListener('DOMContentLoaded', () => {
  function getCatalog(btn) {
    return btn.closest('.catalog__tabs');
  }

  function updateBtns(btn) {
    const catalog = getCatalog(btn);
    const btns = catalog.querySelectorAll('.tabs__btn');
    btns.forEach((el) => {
      el.classList.remove('tabs__btn--active');
    });
    btn.classList.add('tabs__btn--active');
  }

  function updateContent(btn) {
    const catalog = getCatalog(btn);
    const content = catalog.querySelectorAll('.tabs__content');
    content.forEach((el) => {
      el.classList.remove('tabs__content--active');
    });
    const { tabsPath } = btn.dataset;
    catalog.querySelector(`[data-tabs-target="${tabsPath}"]`).classList.add('tabs__content--active');
  }

  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('tabs__btn')) {
      updateBtns(e.target);
      updateContent(e.target);
    }
  });
});
