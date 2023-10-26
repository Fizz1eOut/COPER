document.addEventListener('DOMContentLoaded', () => {
  const ordersProductsList = document.querySelector('.order-content__list');
  const fullPrice = document.querySelector('.fullprice');
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
  const generateOrderProduct = (data) => {
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
                          <div class="cart-product__current" data-counter>${data.count}</div>
                    </div>
                  </div>

                  <div class="card-product__row">
                    <div class="cart-product__text">Ціна за одиницю</div>
                    <span class="cart-product__price">${data.price}</span>
                  </div>
              </article>
            </li>
          `;
  };

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
  console.log(getProducts());

  const addProduct = (data) => {
    ordersProductsList.insertAdjacentHTML('afterbegin', generateOrderProduct(data));
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

  const loadProducts = () => {
    const load = getProducts();
    load.forEach((el) => {
      addProduct(el);
    });
    updatePrice();
    console.log(load);
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
    if (e.target.classList.contains('cart-content__link')) {
      const parent = e.target.closest('.cart-product');
      const { id } = parent.dataset;

      const data = {
        id,
        title: parent.querySelector('.cart-product__title').textContent,
        img: parent.querySelector('.cart-product__img img').getAttribute('src'),
        price: parent.querySelector('.cart-product__price').textContent,
        count: 1,
      };

      console.log(addProduct(data));
    }
  });
});
