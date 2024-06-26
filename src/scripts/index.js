import './styles/index.css';
import initialCards from './cards.js';

function parentWithClass(target, className) {
  // Перебираем родительские элементы до тех пор, пока не достигнем корня документа
  while (target !== document) {
    // Проверяем текущий элемент на наличие заданного класса
    if (target.classList && target.classList.contains(className)) {
      return target; // Если класс найден, возвращаем target
    }

    // Переходим к родительскому элементу
    target = target.parentNode;
  }

  // Если не нашли target ни в одном из родителей, возвращаем false
  return null;
}

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content; // получаю темплейт карточки, это ссылка на DOM узел

// @todo: DOM узлы
const cardsContainer = document.querySelector('.places__list'); // получаю элемент, в который мы будем вставлять темплейт карточки

// @todo: Функция создания карточки
function createCard(cardData, deleteCard, likeClickHandler) {
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
  // Обработка события при нажатии на кнопку удаления
  cardDeleteButton.addEventListener('click', () => {
    deleteCard(cardElement);
  });

  return cardElement;
}

// @todo: Функция удаления карточки
function removeCard(cardElement) {
  cardElement.remove();
}

function handleLike(evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// document.querySelector('.places__list').addEventListener('click', (e) => {
//   if (e.target.classList.contains('card__image')) {
//     e.preventDefault();

//     popupImageViewer.querySelector('.popup__image').setAttribute('src', e.target.src);
//     popupCaption.querySelector('.popup__caption').value = document.querySelector('.card__title').value;
//     openPopup(popupImageViewer);
//   }
// });

// @todo: Вывести карточки на страницу
initialCards.forEach((cardData) => {
  const card = createCard(cardData, removeCard, handleLike); // в переменную card кладу результат функции createCard

  cardsContainer.append(card);
});

let openedPopup;

function closeTopPopup() {
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
    openedPopup = null;
  }
}

function openPopup(popup) {
  openedPopup = popup;
  openedPopup.classList.add('popup_is-opened');
}

const btnProfileAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');

const popupProfileAdd = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const popupImageViewer = document.querySelector('.popup_type_image');
const popupCaption = document.querySelector('.popup__caption');

// eslint-disable-next-line
const body = document.body;

body.addEventListener('click', (e) => {
  if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {
    closeTopPopup();
  }
});

// Используем событие keydown для обработки нажатия клавиши Esc
document.body.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    closeTopPopup();
  }
});

btnProfileAdd.addEventListener('click', (e) => {
  e.preventDefault();
  openPopup(popupProfileAdd);
});

const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const formProfile = document.forms['edit-profile'];

const saveButton = document.querySelector('.popup__button');

btnProfileEdit.addEventListener('click', (e) => {
  e.preventDefault();

  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;

  openPopup(popupProfileEdit);
});

function handleFormSubmit(evt) {
  evt.preventDefault();

  const currentName = popupNameInput.value;
  const currentDescription = popupDescriptionInput.value;

  profileName.textContent = currentName;
  profileDescription.textContent = currentDescription;

  closeTopPopup(popupProfileEdit);
}

formProfile.addEventListener('submit', handleFormSubmit);

document.querySelector('.places__list').addEventListener('click', (e) => {
  if (e.target.classList.contains('card__image')) {
    e.preventDefault();

    popupImageViewer.querySelector('.popup__image').setAttribute('src', e.target.src);
    openPopup(popupImageViewer);
  }
});

function addNewCard(event) {
  event.preventDefault();

  const nameInput = popupProfileAdd.querySelector('.popup__input_type_card-name');
  const linkInput = popupProfileAdd.querySelector('.popup__input_type_url');

  const cardData = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const newCard = createCard(cardData, removeCard, handleLike);

  cardsContainer.prepend(newCard);

  closeTopPopup();
  event.target.reset(); // Сброс формы после добавления карточки
}

const form = document.forms['new-place'];
// const form = popupProfileAdd.querySelector('.popup__form');

form.addEventListener('submit', addNewCard);
