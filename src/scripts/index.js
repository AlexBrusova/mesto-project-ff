import { changeAvatar, deleteCard, editUserCard, editUserProfile, getStartInfo } from '../components/api.js';
import {
  createCard,
  handleLike,
  popupConfirm
} from '../components/card.js';
import { closeModal, openModal, setCloseModalEventListener } from '../components/modal.js';
import { clearValidation, enableValidation } from '../components/validation.js';
import { awaitResponse } from '../utils/utils.js';
import './styles/index.css';

const btnProfileAdd = document.querySelector('.profile__add-button');
const btnProfileEdit = document.querySelector('.profile__edit-button');
const popupProfileAdd = document.querySelector('.popup_type_new-card');
const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const popupNameInput = document.querySelector('.popup__input_type_name');
const popupDescriptionInput = document.querySelector('.popup__input_type_description');
const nameInput = popupProfileAdd.querySelector('.popup__input_type_card-name');
const linkInput = popupProfileAdd.querySelector('.popup__input_type_url');
const userForm = document.forms['edit-profile'];
const popupImageViewer = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const profileImg = document.querySelector('.profile__image');
const listOfPlaces = document.querySelector('.places__list');
const popupConfirmBtn = popupConfirm.querySelector('.popup__button');
const popupTypeProfileAvatarEdit = document.querySelector('.popup_edit-avatar');
const editProfileAvatarButton = document.querySelector('.profile_image-container');
const avatarForm = popupTypeProfileAvatarEdit.querySelector('.popup__form');
const avatarInputLink = avatarForm.querySelector('.popup_input_type_url');
const cardAddForm = document.forms['new-place'];

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const handleDeleteCard = (cardElement, cardId) => {
  openModal(popupConfirm);
  popupConfirm.dataset.cardId = cardId;
  cardElement.dataset.cardId = cardId;
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
  clearValidation(popupProfileEdit, validationConfig);
  openModal(popupProfileEdit);
});

// Обработка редактирования аватара
editProfileAvatarButton.addEventListener('click', () => {
  avatarInputLink.value = '';
  clearValidation(popupTypeProfileAvatarEdit, validationConfig);
  openModal(popupTypeProfileAvatarEdit);
});

avatarForm.addEventListener('submit', () => {
  awaitResponse(avatarForm.querySelector('.popup__button'), true);
  changeAvatar(avatarInputLink.value)
    .then((res) => {
      profileImg.style.backgroundImage = `url(${res.avatar})`;
      closeModal(popupTypeProfileAvatarEdit);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      awaitResponse(avatarForm.querySelector('.popup__button'), false);
    });
});

//Изменение профиля
const editProfileForm = () => {
  awaitResponse(userForm.querySelector('.popup__button'), true);
  editUserProfile(popupNameInput.value, popupDescriptionInput.value)
    .then((data) => {      
      profileName.textContent = data.name;
      profileDescription.textContent = data.about;
      closeModal(popupProfileEdit);
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      awaitResponse(userForm.querySelector('.popup__button'), false);
    });
};

userForm.addEventListener('submit', editProfileForm);

export const renderCard = ({container, data, position, userId}) => {
  const newCard = createCard(
    data,
    handleDeleteCard,
    handleLike,
    handleImageClick,
    userId
  );
  switch (position) {
    case 'prepend':
      container.prepend(newCard);
      break;
    case 'append':
      container.append(newCard);
    default:
      break;
  }
}

// @todo: Обработа формы добавления карточки
const cardFormSubmit = (e) => {
  e.preventDefault();
  awaitResponse(popupProfileAdd.querySelector('.popup__button'), true);
  editUserCard(nameInput.value, linkInput.value).then((response) => {
    renderCard({
      container: listOfPlaces,
      data: response,
      userId: response.owner._id,
      position: 'prepend'
    })
    cardAddForm.reset();
    closeModal(popupProfileAdd);
  })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      awaitResponse(popupProfileAdd.querySelector('.popup__button'), false);
    });
};

cardAddForm.addEventListener('submit', cardFormSubmit);


// Обработка открытия модалки добавления новой карточки
btnProfileAdd.addEventListener('click', (e) => {
  e.preventDefault();
  nameInput.value = '';
  linkInput.value = '';
  clearValidation(popupProfileAdd, validationConfig);
  openModal(popupProfileAdd);
});


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
    renderCard({
      container: listOfPlaces,
      data: cardData,
      userId: userId,
      position: 'append'
    })
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


setCloseModalEventListener(popupProfileEdit);
setCloseModalEventListener(popupImageViewer);
setCloseModalEventListener(popupProfileAdd);
setCloseModalEventListener(popupTypeProfileAvatarEdit);
setCloseModalEventListener(popupConfirm)