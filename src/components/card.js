import { openModal } from './modal.js';
import { addCardLike, removeCardLike } from './api.js';
export const popupConfirm = document.querySelector('.popup_confirm');
const cardTemplate = document.querySelector('#card-template').content; // получаю темплейт карточки, это ссылка на DOM узел

export const cardsContainer = document.querySelector('.places__list'); // получаю элемент, в который мы будем вставлять темплейт карточки

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
      likeButton.classList.add('card__like-button_is-active');
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

  cardLikeButton.addEventListener('click', likeClickHandler);

  cardImage.addEventListener('click', () => {
    handleCardClick(cardData);
  });

  // Обработка события при нажатии на кнопку удаления
  // cardDeleteButton.addEventListener('click', () => {
  //   deleteCard(cardElement);
  // });

  return cardElement;
}

// Функция удаления карточки
// export function removeCard(cardElement) {
//   cardElement.remove();
// }

export const handleDeleteCard = (card, cardId) => {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
  card.dataset.cardId = cardId;
};

// Функци лайка
// export function handleLike(evt) {
//   console.log(evt.target);
//   evt.target.classList.toggle('card__like-button_is-active ');
// }

export const handleLike = (cardLikeButton, cardId, likesCounter) => {
  if(!cardLikeButton.classList.contains('card__like-button_is-active')) {
    addCardLike(cardId)
    .then((res) => {
      cardLikeButton.classList.add('card__like-button_is-active')
      likesCounter.textContent = `${Number(res.likes.length)}`
    })
  } else {
    removeCardLike(cardId)
    .then((res) => {
      cardLikeButton.classList.remove('card__like-button_is-active')
      likesCounter.textContent = `${Number(res.likes.length)}`
    })
  }
}

export default { createCard, handleLike, cardsContainer, popupConfirm };
