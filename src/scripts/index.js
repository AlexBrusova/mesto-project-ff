import './styles/index.css';
import { openModal, closeModal, setCloseModalEventListener } from '../components/modal.js';
import initialCards from './cards.js';
import {
  createCard,
  handleLike,
  cardsContainer,
  popupConfirm,
  handleDeleteCard,
} from '../components/card.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { getStartInfo, editUserProfile, editUserCard, deleteCard, changeAvatar } from '../components/api.js';

const btnProfileAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileAdd = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
// eslint-disable-next-line
const body = document.body;
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupProfileForm = popupProfileAdd.querySelector('.popup__form');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const formProfile = document.forms['edit-profile'];
const nameInput = popupProfileAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupProfileAdd.querySelector('.popup__input_type_url');
const userForm = document.forms['edit-profile'];
const popupImageViewer = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileFormLabelList = popupProfileEdit.querySelectorAll('.popup_form_part');
const popupCardFormPart = popupProfileAdd.querySelectorAll('.popup_form_part');
const profileImg = document.querySelector('.profile__image');
const listOfPlaces = document.querySelector('.places__list');
const popupConfirmBtn = popupConfirm.querySelector('.popup__button');

const popupTypeProfileAvatarEdit = document.querySelector('.popup_edit-avatar')
const editProfileAvatarButton = document.querySelector('.profile_image-container')
const avatarForm = popupTypeProfileAvatarEdit.querySelector('.popup__form')
const avatarLabelList = avatarForm.querySelectorAll('.popup__label')
const avatarInputLink = avatarForm.querySelector('.popup_input_type_url')

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const confirmDelete = () => {
  deleteCard(popupConfirm.dataset.cardId)
    .then(() => {
      listOfPlaces.querySelector(`[data-card-id="${popupConfirm.dataset.cardId}"]`).remove();
    })
    .catch(() => {
      console.error(error);
    })
    .finally(() => {
      delete popupConfirm.dataset.cardId;
      closeModal(popupConfirm);
    });
};

popupConfirmBtn.addEventListener('click', confirmDelete);

// Функция обработки клика по карточке
function handleImageClick(item) {
  popupImage.src = item.link;
  popupImage.alt = item.name;
  popupCaption.textContent = item.name;
  openModal(popupImageViewer);
}

// Обработка открытия модалки редактирования профиля и проброс значений в инпуты
btnProfileEdit.addEventListener('click', (e) => {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  clearValidation(popupProfileEdit, validationConfig)
  openModal(popupProfileEdit);
});

// Обработка редактирования аватара
editProfileAvatarButton.addEventListener('click', () => {
  avatarInputLink.value = ''
  clearValidation(popupTypeProfileAvatarEdit, validationConfig)
  openModal(popupTypeProfileAvatarEdit)
})

const awaitResponse = (buttonElement, state) => {
  if (state) {
    buttonElement.textContent = 'Сохранение...'
  } else [
    buttonElement.textContent = 'Сохранить'
  ]
}

avatarForm.addEventListener('submit',() => {
  awaitResponse(avatarForm.querySelector('.popup__button'), true)
  changeAvatar(avatarInputLink.value)
  .then((res) => {
    profileImg.style.backgroundImage = `url(${res.avatar})`
    closeModal(popupTypeProfileAvatarEdit)
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponse(avatarForm.querySelector('.popup__button'), false)
  })
})

//Изменение профиля
popupNameInput.value = profileName.textContent;
popupDescriptionInput.value = profileDescription.textContent;
const editProfileForm = () => {
  awaitResponse(popupProfileForm.querySelector('.popup__button'), true)
  editUserProfile(popupNameInput.value, popupDescriptionInput.value)
  .then(() => {
    profileName.textContent = popupNameInput.value;
    profileDescription.textContent = popupDescriptionInput.value;
    closeModal(popupProfileForm);
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponse(profileForm.querySelector('.popup__button'), false)
  })
};

userForm.addEventListener('submit', editProfileForm);

// @todo: Обработа формы добавления карточки
const cardFormSubmit = () => {
  editUserCard(nameInput.value, linkInput.value).then((response) => {
    const newCard = createCard(
      response,
      handleDeleteCard,
      handleLike,
      handleImageClick,
      response['owner']['_id']
    );
    listOfPlaces.prepend(newCard);
    popupProfileForm.reset();
    closeModal(popupProfileAdd);
  })
  .catch((error) => {
    console.error(error)
  })
  .finally(() => {
    awaitResponse(profileForm.querySelector('.popup__button'), false)
  })
};

// Обработка открытия модалки добавления новой карточки
btnProfileAdd.addEventListener('click', (e) => {
  e.preventDefault();
  nameInput.value = '';
  linkInput.value = '';
  clearValidation(popupProfileAdd, validationConfig);
  openModal(popupProfileAdd);
});

popupProfileForm.addEventListener('submit', cardFormSubmit);

// Функция валидации попапов

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible',
});

const fillDataUserProfile = (userData) => {
  profileName.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImg.style.backgroundImage = `url(${userData.avatar})`;
};

const loadCards = (cardsData, userId) => {
  cardsData.forEach((cardData) => {
    listOfPlaces.append(createCard(cardData, handleDeleteCard, handleLike, handleImageClick, userId));
  });
};

getStartInfo()
  .then((result) => {
    const [userData, cardsData] = result;
    const userId = userData['_id'];
    fillDataUserProfile(userData);
    loadCards(cardsData, userId);
  })
  .catch((error) => console.error(error));

// Функция редактирования формы профиля, сохранения новых значений и вывода их на стр
function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = popupNameInput.value;
  profileDescription.textContent = popupDescriptionInput.value;

  closeModal(popupProfileEdit);
}
// Вызов функции редактирования профиля

popupProfileEdit.addEventListener('submit', handleProfileFormSubmit);

// Функция добавления новой карточки
// function addNewCard(event) {
//   event.preventDefault();

//   const cardData = {
//     name: nameInput.value,
//     link: linkInput.value,
//   };

//   const newCard = createCard(cardData, handleDeleteCard, handleLike, handleImageClick);

//   cardsContainer.prepend(newCard);

//   closeModal(popupProfileAdd);
//   event.target.reset();
// }

// cardForm.addEventListener('submit', addNewCard);
setCloseModalEventListener(popupProfileEdit);
setCloseModalEventListener(popupImageViewer);
setCloseModalEventListener(popupProfileAdd);
