/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.catalog__tabs');
  const tabsBtn = document.querySelectorAll('.tabs__btn');
  const tabsContent = document.querySelectorAll('.tabs__content');

  const tabsHandler = (path) => {
    tabsBtn.forEach((el) => {
      el.classList.remove('tabs__btn--active');
      document.querySelector(`[data-tabs-path="${path}"]`).classList.add('tabs__btn--active');
    });

    tabsContent.forEach((el) => {
      el.classList.remove('tabs__content--active');
      document.querySelector(`[data-tabs-target="${path}"]`).classList.add('tabs__content--active');
    });
  };

  tabs.forEach((el) => {
    el.addEventListener('click', (e) => {
      if (e.target.classList.contains('tabs__btn')) {
        const { tabsPath } = e.target.dataset;
        tabsHandler(tabsPath);
        
      }
    });
  });
});