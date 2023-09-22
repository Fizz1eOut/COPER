document.addEventListener('DOMContentLoaded', () => {
  const likedBtn = document.querySelectorAll('.product__liked');
  const favoritesList = document.querySelector('.favorites-list');
  const likedQuantity = document.querySelector('.liked__quantity');

  const printQuantity = () => {
    let likedLength = favoritesList.children.length;
    likedQuantity.textContent = likedLength;
    // console.log(cardProductsList)
    // console.log(length)
  };

  const generateLikedProduct = (img, title, liked, rating, stiker, testimonials, price, id) => {
    return `
    <li class="favorites__item">
    <article class="favorites-product" data-id="${id}">
      <div class="favorites-product__row">
        <div class="favorites-product__stiker favorites-product__stiker--green">${stiker}</div>
        <button class="favorites-product__lekid product__liked">
        ${liked}
        </button>
      </div>
      <div class="favorites-product__image">
        <img src="${img}" alt="">
      </div>
      <div class="favorites-product__props">
        <span class="favorites-product__rating">
          <img src="${rating}" alt="">
        </span>
        <span class="favorites-product__testimonials">${testimonials}</span>
      </div>
      <h3 class="favorites-product__title">
        <a href="#">${title}</a>
      </h3>
      <div class="favorites-product__price">
        ${price}
      </div>
      <button class="favorites-product__btn button--buy">До кошика</button>
    </article>
  </li>
          `;
  };

  likedBtn.forEach((el) => {
    el.addEventListener('click', (e) => {
      let parent = e.target.closest('.product');
      let { id } = parent.dataset;
      console.log(id);
      let stiker = parent.querySelector('.product__stiker').textContent;
      let liked = parent.querySelector('.product__liked').innerHTML;
      let img = parent.querySelector('.product__image img').getAttribute('src');
      let rating = parent.querySelector('.product__rating img').getAttribute('src');
      let testimonials = parent.querySelector('.product__testimonials').textContent;
      let title = parent.querySelector('.product__title').textContent;
      let price = parent.querySelector('.product-price').innerHTML;

      favoritesList.insertAdjacentHTML('afterbegin', generateLikedProduct(img, title, liked, rating, stiker, testimonials, price, id));
      console.log(favoritesList);
      printQuantity();

      e.target.disabled = true;
    });
  });
});
