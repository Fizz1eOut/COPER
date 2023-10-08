document.addEventListener('DOMContentLoaded', () => {
  // const likedBtn = document.querySelectorAll('.product__liked');
  const favoritesList = document.querySelector('.favorites-list');
  const likedQuantity = document.querySelector('.liked__quantity');

  // const printQuantity = () => {
  //   // лучше проверять не через children, а искать через querySelectorAll все элементы с классом .favorites__item
  //   // let likedLength = favoritesList.children.length;
  //   // likedQuantity.textContent = likedLength;

  //   const { length } = favoritesList.querySelectorAll('.favorites__item');
  //   likedQuantity.textContent = length;
  // };

  const generateLikedProduct = (data) => {
    return `
      <li class="favorites__item">
        <article class="product" data-id="${data.id}">
          <div class="product__row">
            <div class="product__stiker product__stiker--green">${data.stiker}</div>
            <button class="product__liked active">
            ${data.liked}
            </button>
          </div>
          <div class="product__image">
            <img src="${data.img}" alt="">
          </div>
          <div class="product__props">
            <span class="product__rating">
              <img src="${data.rating}" alt="">
            </span>
            <span class="product__testimonials">${data.testimonials}</span>
          </div>
          <h3 class="product__title">
            <a href="#">${data.title}</a>
          </h3>
          <div class="product__price">
            ${data.price}
          </div>
          <button class="product__btn button--buy">До кошика</button>
        </article>
      </li>
    `;
  };

  // button - элемент кнопки, state - состояние (true - красная, false - нет); если ничего не передали в state, то по дефолту false
  const updateButton = (button, state = false) => button.classList.toggle('active', state);

  const getFavorites = () => {
    try {
      const favoritesRaw = localStorage.getItem('favorites');
      const favorites = JSON.parse(favoritesRaw);
      return Array.isArray(favorites) ? favorites : [];
    } catch {
      console.warn('error while getting favorites from LS');
      return [];
    }
  };

  const updateLikeButtons = () => {
    const products = document.querySelectorAll('.product');
    // console.log(products);
    const favorites = getFavorites();
    // console.log(favorites);
    const result = [...products].filter((el) => {
      const { id } = el.dataset;
      // console.log(id);
      return favorites.some((favorite) => favorite.id === id);
    });
    result.forEach((el) => {
      el.querySelector('.product__liked').classList.add('active');
    });
    // console.log(result);
  };

  updateLikeButtons();

  const printQuantity = () => {
    const quantity = getFavorites();
    likedQuantity.textContent = quantity.length;
  };

  const removeFavorite = (id) => {
    const daleteFavorites = getFavorites();
    const index = daleteFavorites?.findIndex((favorite) => favorite.id === id);
    // console.log(index);
    daleteFavorites.splice(index, 1);
    // console.log(daleteFavorites.splice(index, 1));
    localStorage.setItem('favorites', JSON.stringify(daleteFavorites));
    printQuantity();
  };

  const saveFavorite = (data) => {
    const dataFavorites = getFavorites();
    // some вернет true/false, берем id каждого избранного и сверяем с data.id
    // если такой есть, то вернется true
    // если нет - false
    // мы проверяем на false (восклицательный знак в начале условия)
    if (!dataFavorites.some((favorite) => favorite.id === data.id)) {
      // console.log(!dataFavorites.some((favorite) => favorite.id === data.id));
      dataFavorites.push(data); // раз такого избранного нет - добавляем в конец списка
    }
    // если он уже был в списке, значит ничего не делаем

    localStorage.setItem('favorites', JSON.stringify(dataFavorites));
    printQuantity();
  };

  // удаляем товар из избранного; принимает id товара для удаления
  const removeProduct = (id) => {
    // ищем товар по id
    const product = favoritesList?.querySelector(`[data-id="${id}"]`);
    // находим его обертку, которую мы хотим удалить
    const wrapper = product?.closest('.favorites__item');
    // удаляем товар и заодно проверяем, что он там точно есть через оператор `?`, если вдруг товара/обертки нет, то ошибки не будет
    wrapper?.remove();
    removeFavorite(id);
    printQuantity(); // обновляем количество
  };

  // добавляем товар в избранное; data - объект с данными о товаре для добавления
  const addProduct = (data) => {
    favoritesList?.insertAdjacentHTML('afterbegin', generateLikedProduct(data)); // создаем товар и добавляем в список
    saveFavorite(data);
  };

  const loadFavorites = () => {
    const load = getFavorites();
    load.forEach((el) => {
      addProduct(el);
    });
    // console.log(load);
  };
  loadFavorites(getFavorites());

  document.addEventListener('click', (e) => {
    if (e.target.closest('.product__liked')) {
      const parent = e.target.closest('.product');
      const { id } = parent.dataset;

      const data = { // формируем объект со всеми данными о товаре, чтобы не передавать каждое свойство по одному
        id, // то же самое, что id: id
        title: parent.querySelector('.product__title').textContent,
        price: parent.querySelector('.product__price').innerHTML,
        stiker: parent.querySelector('.product__stiker').textContent,
        rating: parent.querySelector('.product__rating img').getAttribute('src'),
        img: parent.querySelector('.product__image img').getAttribute('src'),
        liked: parent.querySelector('.product__liked').innerHTML,
        testimonials: parent.querySelector('.product__testimonials').textContent,
      };
      // ----> e.target.disabled = true; <----
      // это не работает, потому что e.target - это то, куда именно ты нажал мышкой, а внутри кнопки лежит <svg>, в котором есть еще <path>,
      // поэтому клик может быть на любом из этих элементов, а не конкретно на <button>

      const button = e.target.closest('.product__liked'); // находим нашу реальную кнопку вверх по дереву

      // button.disabled = true; // вместо этого лучше добавлять дополнительный класс для button и красить кнопку в красный цвет
      // этот код перенесен в функцию `updateButton`, disabled тоже убран

      // ищем в списке товар по селектору с id, приводим к boolean с помощью сравнения
      // const isLiked = favoritesList.querySelector(`[data-id="${id}"]`) !== null;

      const favoritesLiked = getFavorites();
      // console.log(favoritesLiked);
      const isLiked = favoritesLiked.some((favorite) => favorite.id === id);
      // console.log(isLiked);

      if (isLiked) { // если уже лайкнуто (товар есть в списке избранного)\
        removeProduct(id); // удаляем товар, передавая его id

        // обновляем кнопку лайка, по дефолту state будет false, поэтому передаем 1 параметр, но можно и явно - updateButton(button, false)
        // после этого завершаем работу с текущим элементом через return
        return updateButton(button);
      }

      // тут мы знаем, что товар не был лайкнут (isLiked === false), поэтому добавляем его в избранное

      addProduct(data); // передаем объект с данными о товаре
      return updateButton(button, true); // state - true, кнопка должна быть красной
    }
  });
});
