

const cardTemplate = document.querySelector('#card-template').content; // получаю темплейт карточки, это ссылка на DOM узел

export const cardsContainer = document.querySelector('.places__list'); // получаю элемент, в который мы будем вставлять темплейт карточки

// export const popupImageViewer = document.querySelector('.popup_type_image');
// export const popupCaption = document.querySelector('.popup__caption');

export function createCard(cardData, deleteCard, likeClickHandler, handleCardClick) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонирую шаблон, если убрать cloneNode(true), то будет та же самая ссылка, что и в cardTemplate. Это нужно, чтобы копировать себе шаблон и использовать его, не изменяя общий шаблон
  const cardImage = cardElement.querySelector('.card__image'); // устанавливаю значение для изображения, устанавливаю ссылки на изображение, но уже конкретно в копии шаблона
  const cardTitle = cardElement.querySelector('.card__title'); // устанавливаю значение для заголовка

  // Присваиваю значения для dom узла из списка карточек
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button'); // устанавливаю значение для кнопки удаления
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardLikeButton.addEventListener('click', likeClickHandler);

  cardImage.addEventListener('click', () => {
    handleCardClick(cardData)
  });

  // cardImage.addEventListener('click', () => {
  //   handleCardClick(popupImageViewer);
  // });

  // Обработка события при нажатии на кнопку удаления
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

export function removeCard(cardElement) {
  cardElement.remove();
}

export function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

export default { createCard, removeCard, handleLike, cardsContainer};
