import { addCardLike, removeCardLike } from './api.js';
const cardTemplate = document.querySelector('#card-template').content; // получаю темплейт карточки, это ссылка на DOM узел

// Функция создания новой карточки
export function createCard(cardData, deleteCard, likeClickHandler, handleCardClick, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонирую шаблон, если убрать cloneNode(true), то будет та же самая ссылка, что и в cardTemplate. Это нужно, чтобы копировать себе шаблон и использовать его, не изменяя общий шаблон
  const cardImage = cardElement.querySelector('.card__image'); // устанавливаю значение для изображения, устанавливаю ссылки на изображение, но уже конкретно в копии шаблона
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const likesCounter = cardElement.querySelector('.likes-counter');

  // Присваиваю значения для dom узла из списка карточек
  cardTitle.textContent = cardData.name;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  likesCounter.textContent = cardData.likes.length;

  cardData.likes.some((likedUser) => {
    if (likedUser['_id'] == userId) {
      cardLikeButton.classList.add('card__like-button_is-active');
    }
  });

  const cardDeleteButton = cardElement.querySelector('.card__delete-button');

  if (cardData.owner['_id'] !== userId) {
    cardDeleteButton.remove();
  } else {
    cardDeleteButton.addEventListener('click', () => {
      deleteCard(cardElement, cardData['_id']);
    });
  }

  cardLikeButton.addEventListener('click', () => {
    likeClickHandler(cardLikeButton, cardData._id, likesCounter)
  });

  cardImage.addEventListener('click', () => {
    handleCardClick(cardData);
  });

  return cardElement;
}


export const handleLike = (cardLikeButton, cardId, likesCounter) => {
  if(!cardLikeButton.classList.contains('card__like-button_is-active')) {
    addCardLike(cardId)
    .then((res) => {
      cardLikeButton.classList.add('card__like-button_is-active')
      likesCounter.textContent = `${Number(res.likes.length)}`
    }).catch(err => console.log(err))
  } else {
    removeCardLike(cardId)
    .then((res) => {
      cardLikeButton.classList.remove('card__like-button_is-active')
      likesCounter.textContent = `${Number(res.likes.length)}`
    }).catch(err => console.log(err))
  }
}

export default { createCard, handleLike};
