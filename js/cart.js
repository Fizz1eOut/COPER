/* eslint-disable */
document.addEventListener('DOMContentLoaded', () => {
  const productsBtn = document.querySelectorAll('.product__btn');
const cartProductsList = document.querySelector('.cart-content__list');
const cart = document.querySelector('.cart');
const cartQuantity = document.querySelector('.cart__quantity');
const fullPrice= document.querySelector('.fullprice');
const productLiked = document.querySelectorAll('.product__liked');
const likedProductsList = document.querySelector('.liked-content__list');
const likedQuantity = document.querySelector('.liked__quantity');
const liked = document.querySelector('.liked');
const orderModalBtn = document.querySelector('.order-modal__btn');
const orderModalList = document.querySelector('.order-modal__list');
let price = 0;
let randomId = 0;

// // Рандомный id элементам
// const randomId = () => {
// 	return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
// };
// Удаление пробелов у строки
const priceWithoutSpaces = (str) => {
	return str.replace(/\s/g, '');
};
// Автоматическое вставление пробелов
const normalPrice = (str) => {
	return String(str).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
};

// принимает текущую цену и суммирует
const plusFullPrice = (currentPrice) => {
	return price += currentPrice;
};
const minusFullPrice = (currentPrice) => {
	return price -= currentPrice;
};

//Текущее цена
const printFullPrice = () => {
  fullPrice.textContent = `${normalPrice(price)} ₴`;
}
// счет элементов в корзине
const printQuantity = () => {
 let length = cartProductsList.querySelector('.simplebar-content').children.length;
 cartQuantity.textContent = length;
 length > 0 ? cart.classList.add('active') : cart.classList.remove('active')
}
// счет элементов в понравившихся товарах
const likedElementCount = () => {
  let length = likedProductsList.querySelector('.simplebar-content').children.length;
  likedQuantity.textContent = length;
  length > 0 ? liked.classList.add('active') : liked.classList.remove('active')
 }

// Разметка в корзине
const generateCartProduct = (img, title, price, id) => {
  return `
  <li class="cart-content__item">
    <article class="cart-content__product cart-product" data-id="${id}">
      <img src="${img}" alt="" class="cart-product__img">
        <div class="cart-product__text">
          <h3 class="cart-product__title">${title}</h3>
            <span class="cart-product__price">${normalPrice(price)} ₴</span>
        </div>
         <button class="cart-product__delete" aria-label="Удалить товар"></button>
    </article>
    </li>
  `
};
const createLikedProduct = (img, title, rating, testimonials, price, id) => {
  return `
    <li class="liked-content__item">
                  <article class="liked-content__product liked-product" data-id="${id}">
                    <img src="${img}" alt="" class="liked-product__img">
                    <div class="liked-product__wrapper">
                      <div class="liked-product__row">
                        <div class="liked-product__text">Назва товару</div>
                        <h3 class="liked-product__title">${title}</h3>
                      </div>

                        <div class="liked-product__reviews reviews">
                          <div class="reviews__rating">
                            <img src="${rating}" alt="рейтинг">
                          </div>
                          <a href="" class="reviews__link">${testimonials}</a>
                        </div>
                        <div class="liked-product__cost">
                          <div class="liked-product__text">Ціна за одиницю</div>
                          <span class="liked-product__price">${price}</span>
                        </div>
                    </div>
                    <button class="liked-product__delete" aria-label="Удалить товар"></button>
                  </article>
      </li>
  </li>
  `
};

// удаление элемента из корзины
const deleteProducts = (productParent) => {
	let id = productParent.querySelector('.cart-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = false;
	
	let currentPrice = parseInt(priceWithoutSpaces(productParent.querySelector('.cart-product__price').textContent));
	minusFullPrice(currentPrice);
	printFullPrice();
	productParent.remove();

	printQuantity();
  // вызываем функцию добавление в localStorage
  updateStorage();
};

// удаление элемента из понравившихся
const deleteLikedProducts = (productParent) => {
	let id = productParent.querySelector('.liked-product').dataset.id;
	document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__liked').disabled = false;
  productParent.remove();

	likedElementCount();
};

productsBtn.forEach(el => {
  el.closest('.product').setAttribute('data-id', randomId++); // рандомный id
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;// текущий элемент по которому клик
    let parent = self.closest('.product');// находим текущий продукт
    let id = parent.dataset.id;//получаем id
    let img = parent.querySelector('.product__image img').getAttribute('src'); // img ээлемента
    let title = parent.querySelector('.product__title').textContent; // title элемента
    let priceNumber = parseInt(priceWithoutSpaces(parent.querySelector('.product-price__current').textContent)); // price элемента числом

    // считается сумма
    plusFullPrice(priceNumber);
    console.log(price);

    // Записывается сумма
    printFullPrice();

    // add to cart
    cartProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', generateCartProduct(img, title, priceNumber, id));

    // Считаем кол-во элементов корзине
    printQuantity();

    // вызываем функцию добавление в localStorage
    updateStorage();

    // disabled btn
    self.disabled = true;
  });
});


productLiked.forEach(el => {
  el.closest('.product').setAttribute('data-id', randomId++); // рандомный id
  el.addEventListener('click', (e) => {
    let self = e.currentTarget;// текущий элемент по которому клик
    let parent = self.closest('.product');// находим текущий продукт
    let id = parent.dataset.id;//получаем id
    let img = parent.querySelector('.product__image img').getAttribute('src'); // img ээлемента
    let title = parent.querySelector('.product__title').textContent; // title элемента
    let rating = parent.querySelector('.product__rating img').getAttribute('src'); // img ээлемента
    let testimonials = parent.querySelector('.product__testimonials').textContent; // text элемента
    let price = parent.querySelector('.product-price__current').textContent; // price элемента числом

    // add to cart
    likedProductsList.querySelector('.simplebar-content').insertAdjacentHTML('afterbegin', createLikedProduct(img, title, rating, testimonials, price, id));
    console.log(likedProductsList)
    
    // Считаем кол-во элементов корзине
    likedElementCount();

    // disabled btn
    self.disabled = true;
  });
});

cartProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('cart-product__delete')) {
		deleteProducts(e.target.closest('.cart-content__item'));
	}
});

likedProductsList.addEventListener('click', (e) => {
	if (e.target.classList.contains('liked-product__delete')) {
		deleteLikedProducts(e.target.closest('.liked-content__item'));
	}
});

// выпадающее меню в модальном окне
let flag = 0;
orderModalBtn.addEventListener('click', () => {
  if (flag === 0) {
    orderModalBtn.classList.add('open');
    orderModalList.style.display = 'block';
    flag = 1;
  } else {
    orderModalBtn.classList.remove('open');
    orderModalList.style.display = 'none';
    flag = 0;
  }
});

// Разметка в модалке
const generateModalProduct = (img, title, price, id) => {
  return `
  <li class="order-modal__item">
    <article class="order-modal__product order-product" data-id="${id}">
      <img src="${img}" alt="" class="order-product__img">

      <div class="order-product__row">
        <div class="liked-product__text">Назва товару</div>
          <h3 class="order-product__title">${title}</h3>
        </div>
                      
        <div class="order-product__row">
          <div class="liked-product__text">Ціна</div>
          <span class="order-product__price">${normalPrice(price)}</span>
        </div>

        <button class="order-product__delete">Удалить</button>
    </article>
  </li> 
  `
};

/* 
productsBtn.forEach(el => {
  el.addEventListener('click', () => {
    let array = cartProductsList.querySelector('.simplebar-content').children;
    let fullprice = fullPrice.textContent;
    let length = array.length;
    console.log(array)

    document.querySelector('.order-modal__quantity span').textContent = `${length} шт`;
    document.querySelector('.order-modal__summ span').textContent = `${fullprice}`;
    for (item of array) {
      console.log(item)
      let img = item.querySelector('.cart-product__img').getAttribute('src');
      let title = item.querySelector('.cart-product__title').textContent;
      let priceString = priceWithoutSpaces(item.querySelector('.cart-product__price').textContent);
      let id = item.querySelector('.cart-product').dataset.id;

      orderModalList.insertAdjacentHTML('afterbegin', generateModalProduct(img, title, priceString, id));
    }
});
});
*/


// считаем сумму общую сумму
const countSumm = () => {
  // проходим по всем элементам
  document.querySelectorAll('.cart-content__item').forEach(el => {
    price += parseInt(priceWithoutSpaces(el.querySelector('.cart-product__price').textContent)); // считаем
  });
};

//  localStorage
const initialState = () => {
  // проверяем елси что-то есть в прокдуктах то выводим
  if (localStorage.getItem('products') !== null) {
    cartProductsList.querySelector('.simplebar-content').innerHTML = localStorage.getItem('products');
    printQuantity();
    countSumm();
    printFullPrice();

    document.querySelectorAll('.cart-content__product').forEach(el => {
      let id = el.dataset.id;
      // console.log(id)
      document.querySelector(`.product[data-id="${id}"]`).querySelector('.product__btn').disabled = true;
    });
  }
};
// вызов localStorage
initialState();

// добавляем в localStorage
const updateStorage = () => {
  let parent = cartProductsList.querySelector('.simplebar-content'); // находим родителя всех элементов корзины
  let html = parent.innerHTML; // находим элемент
  // console.log(html)
  html = html.trim(); // убираем лишние пробелы

  // если есть элемент
  if (html.length) {
    localStorage.setItem('products', html); // добавляем в localStorage
  } else {
    localStorage.removeItem('products'); // удаляем c localStorage
  }
};

/* 
// удаление из модалки
document.querySelector('.modal').addEventListener('click', (e) => {
  if (e.target.classList.contains('order-product__delete')) {
    let id = e.target.closest('.order-modal__product').dataset.id;
    let cartProduct = document.querySelector(`.cart-content__product[data-id="${id}"]`).closest('.cart-content__item');
    deleteProducts(cartProduct)
    e.target.closest('.order-modal__product').remove();
  }
});
*/

});


  