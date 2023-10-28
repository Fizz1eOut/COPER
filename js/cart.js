document.addEventListener('DOMContentLoaded', () => {
  const productsBtn = document.querySelectorAll('.product__btn');
  const cardProductsList = document.querySelector('.cart-content__list');
  const cardQuantity = document.querySelector('.cart__quantity');
  const fullPrice = document.querySelector('.fullprice');

  let randomId = 0;
  productsBtn.forEach((el) => {
    el.closest('.product').setAttribute('data-id', randomId++);
  });
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

  // разметка элемента добавленого в корзину
  const generateCartProduct = (data) => {
    return `
            <li class="cart-content__item">
              <article class="cart-content__product cart-product" data-id="${data.id}">
                <img src="${data.img}" alt="Зображення товару" class="cart-product__img">
                  <div class="card-product__row">
                    <div class="cart-product__text">Назва товару</div>
                    <h3 class="cart-product__title">${data.title}</h3>
                  </div>

                  <div class="card-product__row">
                    <div class="cart-product__text cart-product__text-mg">Кількість</div>
                    <div class="cart-product__wrapper">
                          <div class="cart-product__control" data-action="minus">-</div>
                          <div class="cart-product__current" data-counter>${data.count}</div>
                          <div class="cart-product__control" data-action="plus">+</div>
                    </div>
                  </div>

                  <div class="card-product__row">
                    <div class="cart-product__text">Ціна за одиницю</div>
                    <span class="cart-product__price">${data.price}</span>
                  </div>

                <button class="cart-product__delete" aria-label="Удалить товар"></button>
              </article>
            </li>
          `;
  };

  const updateButton = (button, state = false) => button.classList.toggle('active', state);

  const getProducts = () => {
    try {
      const productsRaw = localStorage.getItem('cart');
      const products = JSON.parse(productsRaw);
      return Array.isArray(products) ? products : [];
    } catch {
      console.warn('error while getting cart from LS');
      return [];
    }
  };
  getProducts();

  const updateLikeButtons = () => {
    const products = document.querySelectorAll('.product');
    // console.log(products);
    const cart = getProducts();
    // console.log(cart);
    const result = [...products].filter((el) => {
      const { id } = el.dataset;
      // console.log(id);
      return cart.some((product) => product.id === id);
    });
    result.forEach((el) => {
      el.querySelector('.product__btn').classList.add('active');
    });
    // console.log(result);
  };
  updateLikeButtons();

  const printQuantity = () => {
    const quantity = getProducts();
    cardQuantity.textContent = quantity.length;
    const empty = document.querySelector('.cart-content__empty');
    if (cardQuantity.textContent > 0) {
      empty.style.display = 'none';
    } else {
      empty.style.display = 'block';
    }
  };

  const removeProduct = (id) => {
    const products = getProducts();
    const index = products.findIndex((product) => product.id === id);
    // console.log(index);
    products.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(products));
    printQuantity();
    updatePrice();
  };

  const updateProduct = (id, count) => {
    const products = getProducts();
    // console.log(products);
    const index = products.findIndex((product) => product.id === id);
    // console.log(index);
    const obj = products[index];
    obj.count = count;
    // console.log(obj);
    localStorage.setItem('cart', JSON.stringify(products));

    // products.splice(index, 1, { ...products[index], count });
    // localStorage.setItem('cart', JSON.stringify(products));
  };

  const saveProduct = (data) => {
    const dataProducts = getProducts();
    if (!dataProducts.some((products) => products.id === data.id)) {
      dataProducts.push(data);
    }

    localStorage.setItem('cart', JSON.stringify(dataProducts));
    printQuantity();
    updatePrice();
  };

  const removeProductCart = (id) => {
    const product = cardProductsList.querySelector(`[data-id="${id}"]`);
    const wrapper = product?.closest('.cart-content__item');
    wrapper?.remove();
    removeProduct(id);
    printQuantity();
    updatePrice();
  };

  const addProduct = (data) => {
    cardProductsList?.insertAdjacentHTML('afterbegin', generateCartProduct(data)); // создаем товар и добавляем в список
    saveProduct(data);
  };

  const loadProducts = () => {
    const load = getProducts();
    load.forEach((el) => {
      addProduct(el);
    });
    // console.log(load);
  };
  loadProducts(getProducts());

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
      const { id } = counter.closest('.cart-product').dataset;
      // console.log(id);
      const count = +counter.textContent;
      // console.log(count);
      updatePrice();
      updateProduct(id, count);
    }

    // Проверяем является ли элемент по которому был совершен клик кнопкой Минус
    if (e.target.dataset.action === 'minus') {
      // Проверяем чтобы счетчик был больше 1
      if (parseInt(counter.innerText) > 1) {
      // Изменяем текст в счетчике уменьшая его на 1
        counter.innerText = --counter.innerText;
        const { id } = counter.closest('.cart-product').dataset;
        const count = counter.textContent;
        updatePrice();
        updateProduct(id, +count);
      }
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('.product__btn')) {
      const parent = e.target.closest('.product');
      const { id } = parent.dataset;

      const data = {
        id,
        title: parent.querySelector('.product__title').textContent,
        img: parent.querySelector('.product__image img').getAttribute('src'),
        price: parent.querySelector('.product-price__current').textContent,
        count: 1,
      };

      const button = e.target.closest('.product__btn');
      addProduct(data);
      return updateButton(button, true);
    }

    if (e.target.classList.contains('cart-product__delete')) {
      const parent = e.target.closest('.cart-product');
      const { id } = parent.dataset;

      const cartProduct = getProducts();
      console.log(cartProduct);

      const added = cartProduct.some((product) => product.id === id);

      if (added) {
        removeProductCart(id);
        document.querySelector(`.product[data-id='${id}']`).querySelector('.product__btn').classList.remove('active');
      }
    }
  });
});
