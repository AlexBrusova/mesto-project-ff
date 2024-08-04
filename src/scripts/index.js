import './styles/index.css';
import { openModal, closeModal, setCloseModalEventListener } from '../components/modal.js';
import initialCards from './cards.js';
import { createCard, handleLike, removeCard, cardsContainer } from '../components/card.js';
import { enableValidation } from '../components/validation.js';

const btnProfileAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileAdd = document.querySelector('.popup_type_new-card');
const popupForm = popupProfileAdd.querySelector('.popup__form');
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
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

// Функция обработки клика по карточке
function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(popupImageViewer);
}

// Вывод карточек на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, handleLike, handleImageClick);

  cardsContainer.append(card);
});

// Обработка открытия модалки добавления новой карточки
btnProfileAdd.addEventListener('click', (e) => {
  e.preventDefault();
  openModal(popupProfileAdd);
});

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

// Обработка открытия модалки редактирования профиля и проброс значений в инпуты
btnProfileEdit.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;

  openModal(popupProfileEdit);
});

// Функция редактирования формы профиля, сохранения новых значений и вывода их на стр
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;

  closeModal(popupProfileEdit);
}
// Вызов функции редактирования профиля

formProfile.addEventListener('submit', handleProfileFormSubmit);

// Функция добавления новой карточки
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
