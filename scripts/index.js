// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; //получаю темплейт карточки

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); //получаю элемент, в который мы будем вставлять темплейт карточки

// @todo: Функция создания карточки
function addCard(cardData, deleteCard) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); //клонирую шаблон
  const cardImage = cardElement.querySelector('.card__image'); //устанавливаю значение для изображения
  const cardTitle = cardElement.querySelector('.card__title'); //устанавливаю значение для заголовка
  
  //?? 
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;

  const cardDeliteButton = cardElement.querySelector('.card__delete-button'); //устанавливаю значение для кнопки удаления

  //Обработка события при нажатии на кнопку удаления
  cardDeliteButton.addEventListener('click', function(evt) {
    deleteCard(cardElement);
  });
  
  return cardElement;
}

// @todo: Функция удаления карточки
function cardRemove (cardElement) {
  cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function(cardData){
  const card = addCard(cardData, cardRemove);
  cardsContainer.append(card);
})
