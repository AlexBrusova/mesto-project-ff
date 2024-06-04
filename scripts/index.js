// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //получаю темплейт карточки, это ссылка на DOM узел

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); //получаю элемент, в который мы будем вставлять темплейт карточки

// @todo: Функция создания карточки
function createCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонирую шаблон, если убрать cloneNode(true), то будет та же самая ссылка, что и в cardTemplate. Это нужно, чтобы копировать себе шаблон и использовать его, не изменяя общий шаблон
  const cardImage = cardElement.querySelector('.card__image'); //устанавливаю значение для изображения, устанавливаю ссылки на изображение, но уже конкретно в копии шаблона
  const cardTitle = cardElement.querySelector('.card__title'); //устанавливаю значение для заголовка
  
  //?? 
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button'); //устанавливаю значение для кнопки удаления

  //Обработка события при нажатии на кнопку удаления
  cardDeleteButton.addEventListener('click', function() {
    deleteCard(cardElement);
  });
  
  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData){
  const card = createCard(cardData, removeCard); //в переменную card кладу результат функции createCard
  cardsContainer.append(card);
})
