// Функция закрытия модалок по нажатию на Esc
const handleEscClose = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    const activePopup = document.querySelector('.popup_is-opened');

    closeModal(activePopup);
  }
};

// Функция закрытия модалок
export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEscClose);
};

// Функция открытия модалок
export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

// Функция закрытия модалок
export const setCloseModalEventListener = (modalWindow) => {
  modalWindow.addEventListener('mousedown', (e) => {    
    console.log(e.target);
    
    if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {
      closeModal(modalWindow);
    }
  });
};

export default {};
