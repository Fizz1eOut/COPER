/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
const productsBtn = document.querySelectorAll('.product__btn');
const cardProductsList = document.querySelector('.cart-content__list');
const cardQuantity = document.querySelector('.cart__quantity');
const fullPrice = document.querySelector('.fullprice');
const ordersProductsList = document.querySelector('.orders__list');
const cartContentLink = document.querySelector('.cart-content__link');
let price = 0;
let randomId = 0;

const getPrice = (str) => {
  return +str.replace(/\D+/g, '');
};

const normalPrice = (str) => {
  return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};
const updatePrice = () => {
  const products = document.querySelectorAll('.cart-product');
  const totalCost = [...products].reduce((acc, product) => {
    const productPrice = getPrice(product.querySelector('.cart-product__price').textContent);
    const productCount = +product.querySelector('.cart-product__current').textContent;
    const productCost = productPrice * productCount;
    return acc + productCost;
  }, 0);
  fullPrice.textContent = `${normalPrice(totalCost)} ₴`;
};
// считаем и выводим кол-во
const printQuantity = () => {
  let productLength = cardProductsList.children.length;
  cardQuantity.textContent = productLength;
  // console.log(cardProductsList)
  // console.log(length)
  const empty = document.querySelector('.cart-content__empty');
  if (productLength > 0) {
    empty.style.display = 'none';
  } else {
    empty.style.display = 'block';
  }
};

// разметка элемента добавленого в корзину
const generateCartProduct = (img, title, price, id) => {
  return `
          <li class="cart-content__item">
            <article class="cart-content__product cart-product" data-id="${id}">
              <img src="${img}" alt="Зображення товару" class="cart-product__img">
                <div class="card-product__row">
                  <div class="cart-product__text">Назва товару</div>
                  <h3 class="cart-product__title">${title}</h3>
                </div>

                <div class="card-product__row">
                  <div class="cart-product__text cart-product__text-mg">Кількість</div>
                  <div class="cart-product__wrapper">
                        <div class="cart-product__control" data-action="minus">-</div>
                        <div class="cart-product__current" data-counter>1</div>
                        <div class="cart-product__control" data-action="plus">+</div>
									</div>
                </div>

                <div class="card-product__row">
                  <div class="cart-product__text">Ціна за одиницю</div>
                  <span class="cart-product__price">${normalPrice(price)}</span>
                </div>

              <button class="cart-product__delete" aria-label="Удалить товар"></button>
            </article>
          </li>
        `;
};

// удаление товаров в козине
const deleteProducts = (productParent) => {
  // получаем id
  let id = productParent.querySelector('.cart-product').dataset.id;
  document.querySelector(`.product[data-id='${id}']`).querySelector('.product__btn').disabled = false;
	productParent.remove();
  updatePrice();
	printQuantity();
  updateStorage();
}

// проходим по всем кнопкам
productsBtn.forEach((el) => {
  el.closest('.product').setAttribute('data-id', randomId++); // находим родителя карт товара и задаем ему рандомнный id
  el.addEventListener('click', (e) => {
    let self = e.target;
    let parent = self.closest('.product'); // находим текущий продукт
    let id = parent.dataset.id; // получаем id
    let img = parent.querySelector('.product__image img').getAttribute('src'); // картинка товара
    let title = parent.querySelector('.product__title').textContent; // title товара
    let priceString = getPrice(parent.querySelector('.product-price__current').textContent);
    // let priceNumber = getPrice(parent.querySelector('.product-price__current').textContent); // цена товара
    // console.log(priceNumber);
    // добавить в корзину
    cardProductsList.insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceString, id));
    updatePrice();
    // считаем и выводим кол-во эл в корзине
    printQuantity();
    // добавление в LS
    updateStorage();
    // disabled btn
    self.disabled = true;
  });
});

cardProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});

document.addEventListener('click', (e) => {
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
    updatePrice();
  }

  // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
  if (e.target.dataset.action === 'minus') {
    // Проверяем чтобы счетчик был больше 1
    if (parseInt(counter.innerText) > 1) {
    // Изменяем текст в счетчике уменьшая его на 1
      counter.innerText = --counter.innerText;
      updatePrice();
    }
  }
});


const generateOrdersProduct = (img, title, price, id) => {
  return `
  <li class="orders__item">
    <article class="orders__product orders-product" data-id="${id}">
      <img src="${img}" alt="Зображення товару" class="orders-product__img">
        <div class="orders-product__row">
          <div class="orders-product__text">Назва товару</div>
          <h3 class="orders-product__title">${title}</h3>
        </div>

        <div class="orders-product__row">
          <div class="orders-product__text orders-product__text-mg">Кількість</div>
          <div class="cart-product__wrapper">
            <div class="cart-product__control" data-action="minus">-</div>
              <div class="cart-product__current" data-counter>1</div>
            <div class="cart-product__control" data-action="plus">+</div>
      </div>
        </div>

        <div class="orders-product__row">
          <div class="orders-product__text">Ціна за одиницю</div>
          <span class="orders-product__price">${normalPrice(price)}</span>
        </div>

      <button class="orders-product__delete" aria-label="Удалить товар"></button>
    </article>
  </li>
  `;
};

// cartContentLink.addEventListener('click', () => {
//   let array = cardProductsList.children;
//   let fullprice = fullPrice.textContent;
//   document.querySelector('.orders-content__fullprice span').textContent = `${fullprice}`;
//   for (item of array);
//   console.log(item);
//       let img = item.querySelector('.cart-product__img').getAttribute('src');
//       let title = item.querySelector('.cart-product__title').textContent;
//       let priceString = getPrice(item.querySelector('.cart-product__price').textContent);
//       let id = item.querySelector('.cart-product').dataset.id;

//       ordersProductsList.insertAdjacentHTML('afterbegin', generateOrdersProduct(img, title, priceString, id));
// });

// cartContentLink.addEventListener('click', () => {
//     let item = cardProductsList;
//     console.log(item)
//     let fullprice = fullPrice.textContent;
//     document.querySelector('.orders-content__fullprice span').textContent = `${fullprice}`;
//         let img = item.querySelector('.cart-product__img').getAttribute('src');
//         let title = item.querySelector('.cart-product__title').textContent;
//         let priceString = getPrice(item.querySelector('.cart-product__price').textContent);
//         let id = item.querySelector('.cart-product').dataset.id;
  
//         ordersProductsList.insertAdjacentHTML('afterbegin', generateOrdersProduct(img, title, priceString, id));
//   });

const initialState = () => {
  if (localStorage.getItem('products') !== null) {
    cardProductsList.innerHTML = localStorage.getItem('products');
    printQuantity();
    updatePrice();

    document.querySelectorAll('.cart-content__product').forEach(el => {
      let id = el.dataset.id;
      // console.log(id)
      document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
    });
  }
}
initialState();
// добавление в LS
const updateStorage = () => {
  let parent = cardProductsList;
  let html = parent.innerHTML;
  html = html.trim();
  // console.log(html);
  if (html.length) {
    localStorage.setItem('products', html);
  } else {
    localStorage.removeItem('products');
  }
}

// const initialState = () => {

// };

// const updateStorage = () => {
//   let parent = cardProductsList;
//   console.log(parent);
// }
});
