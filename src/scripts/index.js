import './styles/index.css';
import { openModal, closeModal, setCloseModalEventListener } from '../components/modal.js';
import initialCards from './cards.js';
import {
  createCard,
  handleLike,
  removeCard,
  cardsContainer,
  // popupImageViewer,
  // popupCaption,
} from '../components/card.js';

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
const cardForm = document.forms['new-place'];
const popupImageViewer = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');

function handleImageClick(e) {
  e.preventDefault();

  const imageSrc = e.target.src;
  const imageTitle = e.target.alt;

  popupImageViewer.setAttribute('src', imageSrc);
  popupImageViewer.setAttribute('alt', imageTitle);
  popupCaption.textContent = imageTitle;
  openModal(popupImageViewer);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, handleLike, handleImageClick); // в переменную card кладу результат функции createCard

  cardsContainer.append(card);
});

// body.addEventListener('click', (e) => {
//   if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {
//     closeModal();
//   }
// });

// document.body.addEventListener('keydown', (e) => {
//   if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
//     closeModal();
//     // document.body.removeEventListener();
//   }
// });

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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;

  closeModal(popupProfileEdit);
}

formProfile.addEventListener('submit', handleProfileFormSubmit);

function addNewCard(event) {
  event.preventDefault();

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(cardData, removeCard, handleLike, handleImageClick);

  cardsContainer.prepend(newCard);

  closeModal(popupProfileAdd);
  event.target.reset(); // Сброс формы после добавления карточки
}

cardForm.addEventListener('submit', addNewCard);
setCloseModalEventListener(popupProfileEdit);
setCloseModalEventListener(popupImageViewer);
setCloseModalEventListener(popupProfileAdd);
