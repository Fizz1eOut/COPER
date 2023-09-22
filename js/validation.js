/* eslint-disable */
const form = document.forms; // считываем форму
// console.log(form)
const allForms = [...form];
// console.log(allForms)
const formArr = Array.from(allForms); // формируем массив из элементов формы
// console.log(formArr)
const validFormArr = []; // в этом массиве хранятся поля, которые нужно проверить
//const button = form.elements["button"]; // считываем кнопку
formArr.forEach((el) => {
  // проверка на валидность
  if (el.hasAttribute('data-reg')) {
    el.setAttribute('is-valid', '0');
    validFormArr.push(el);
  }
});
//console.log(formArr);


// что-то делаем при вводе
allForms.forEach((el) => {
el.addEventListener('input', inputHandler);
});
// button.addEventListener("click", buttonHandler);

// поле вода по которому был клик
function inputHandler({ target }) {
  if (target.hasAttribute("data-reg")) {
    inputCheck(target);
  }
}

// проверка инпутов
function inputCheck(el) {
  const inputValue = el.value; // считываем значение формы
  const inputReg = el.getAttribute('data-reg'); // считываем выражение
  const reg = new RegExp(inputReg); // RegExp нужен для работы с «регулярками»
  // console.log(inputValue, reg);
  if (reg.test(inputValue)) { // test проверяем соответствует ли введенное значение в поле нашему регулярному выражению
    el.setAttribute('is-valid', '1');
    el.style.border = '2px solid var(--color-green)'
  } else {
    el.setAttribute('is-valid', '0');
    el.style.border = '2px solid var(--color-orange)'
  }
}

function buttonHandler(e) { // предназначена для обработки нажатия кнопки
  const allValid = []; // создаем массив
  validFormArr.forEach((el) => {
    allValid.push(el.getAttribute('is-valid'));
  });
  // console.log(allValid);
  const isAllValid = allValid.reduce((acc, current) => {
    return acc && current;
  });
  // console.log(isAllValid);

   if (!Boolean(Number(isAllValid))) {
    e.preventDefault();
  }

}