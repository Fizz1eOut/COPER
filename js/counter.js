// Добавляем прослушку на всем окне
document.addEventListener('click', (e) => {
  // const calcCounter = () => {
  //   // const cartProduct = document.querySelectorAll('.cart-content__product');
  //   // let priceTotal = 0;

  //   // cartProduct.forEach(() => {
  //   //   const cardCounter = document.querySelector('[data-counter]');
  //   //   const cardPrice = document.querySelector('.cart-product__fullprice');

  //   //   const currentPrice = parseInt(cardCounter.innerText) * parseInt(cardPrice.innerText);
  //   //   // console.log(currentPrice);
  //   //   priceTotal += currentPrice;
  //   // });
  //   // console.log(priceTotal);
  // };
  // Объявляем переменную для счетчика
  let counter;
  // Проверяем клик строго по кнопкам Плюс либо Минус
  if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
    // Находим обертку счетчика
    const counterWrapper = e.target.closest('.cart-product__wrapper');
    // Находим див с числом счетчика
    counter = counterWrapper.querySelector('[data-counter]');
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
  if (e.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  if (e.target.dataset.action === 'minus') {
    // Проверяем чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
    // Изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;
    }
  }
});
