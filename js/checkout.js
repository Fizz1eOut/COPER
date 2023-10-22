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
                          <div class="cart-product__current" data-counter>1</div>
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
    if (e.target.classList.contains('cart-content__link')) {
      const parent = e.target.closest('.cart-product');
      const { id } = parent.dataset;

      const data = {
        id,
        title: parent.querySelector('.cart-product__title').textContent,
        img: parent.querySelector('.cart-product__img img').getAttribute('src'),
        price: parent.querySelector('.cart-product__price').textContent,
        // counter: parent.querySelector('.cart-product__current').textContent,
      };

      console.log(addProduct(data));
    }
  });
});
