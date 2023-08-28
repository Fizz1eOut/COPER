// Добавляем прослушку на всем окне
document.addEventListener('click', (e) => {
  // const calcCounter = () => {
  //   const cartProduct = document.querySelector('.cart-content__product');
  //   const priceElements = cartProduct.querySelectorAll('.cart-product__price');
  //   const fullPrice = document.querySelector('.fullprice');
  //   // let priceTotal = 0;

  //   // cartProduct.forEach(() => {
  //   //   const cardCounter = document.querySelector('[data-counter]');
  //   //   const cardPrice = document.querySelector('.cart-product__price');

  //   //   const currentPrice = parseInt(cardCounter.innerText) * parseInt(cardPrice.innerText);
  //   //   // console.log(currentPrice);
  //   //   priceTotal += currentPrice;
  //   // });

  //   let priceTotal = 0;

  //   // Обходим все блоки с ценами в корзине
  //   priceElements.forEach((el) => {
  //     // Находим количество товара
  //     const amountEl = el.closest('.cart-content__product').querySelector('[data-counter]');
  //     // Добавляем стоимость товара в общую стоимость (кол-во * цену)
  //     priceTotal += parseInt(el.innerText) * parseInt(amountEl.innerText);
  //   });
  //   fullPrice.innerText = priceTotal;
  //   console.log(priceTotal);
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
