// Добавляем прослушку на всем окне
document.addEventListener('click', (e) => {
  const fullPrice = document.querySelector('.fullprice');
  let totalPrice = 0;

  const priceWithoutSpaces = (str) => {
    return str.replace(/\s/g, '');
  };
  const normalPrice = (str) => {
    return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
  };

  const calcCounter = () => {
    const cartContentItem = document.querySelectorAll('.cart-content__item');
    // console.log(cartContentItem);
    cartContentItem.forEach((el) => {
      // console.log(el);
      const cartCounter = el.querySelector('[data-counter]');
      // console.log(cartCounter);
      // const cartProductPriceString = el.querySelector('.cart-product__price').textContent;
      // console.log(cartProductPriceString);
      const cartProductPriceNumber = parseInt(priceWithoutSpaces(el.querySelector('.cart-product__price').textContent));
      // console.log(cartProductPriceNumber);
      const currentPrice = parseInt(cartCounter.innerText) * parseInt(cartProductPriceNumber);
      // console.log(currentPrice);
      totalPrice += currentPrice;
      // console.log(totalPrice);
      fullPrice.textContent = `${normalPrice(totalPrice)} ₴`;
    });
  };
  // Объявляем переменную для счетчика
  let counter;
  // Проверяем клик строго по кнопкам Плюс либо Минус
  if (e.target.dataset.action === 'plus' || e.target.dataset.action === 'minus') {
    // Находим обертку счетчика
    const counterWrapper = e.target.closest('.cart-product__wrapper');
    // Находим див с числом счетчика
    counter = counterWrapper.querySelector('[data-counter]');
    // console.log(counter);
  }
  // Проверяем является ли элемент по которому был совершен клик кнопкой Плюс
  if (e.target.dataset.action === 'plus') {
    counter.innerText = ++counter.innerText;
    calcCounter();
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  if (e.target.dataset.action === 'minus') {
    // Проверяем чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
    // Изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;
      calcCounter();
    }
  }
});
