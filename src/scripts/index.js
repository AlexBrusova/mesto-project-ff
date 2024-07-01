import './styles/index.css';
import { openModal, closeModal } from '../components/modal.js';
import initialCards from './cards.js';
import { createCard, handleLike, removeCard, cardsContainer, handleImageClick } from '../components/card.js';

const btnProfileAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileAdd = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
// eslint-disable-next-line
const body = document.body;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const formProfile = document.forms['edit-profile'];
const nameInput = popupProfileAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupProfileAdd.querySelector('.popup__input_type_url');
const form = document.forms['new-place'];
const currentName = popupNameInput.value;
const currentDescription = popupDescriptionInput.value;

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, handleLike, openModal, handleImageClick); // в переменную card кладу результат функции createCard

  cardsContainer.append(card);
});

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {
    closeModal();
  }
});

// Используем событие keydown для обработки нажатия клавиши Esc
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    closeModal();
  }
});

btnProfileAdd.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(popupProfileAdd);
});

btnProfileEdit.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = currentName;
  profileDescription.textContent = currentDescription;

  closeModal(popupProfileEdit);
}

formProfile.addEventListener('submit', handleFormSubmit);

function addNewCard(event) {
  event.preventDefault();

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(cardData, removeCard, handleLike, openModal, handleImageClick);

  cardsContainer.prepend(newCard);

  closeModal();
  event.target.reset(); // Сброс формы после добавления карточки
}

form.addEventListener('submit', addNewCard);
