const handleEscClose = (e) => {
  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {
    const activePopup = document.querySelector('.popup_is-opened');

    closeModal(activePopup);
  }
};

export const closeModal = (popup) => {
  popup.classList.remove('popup_is-opened');
  document.removeEventListener('keydown', handleEscClose);
};

export const openModal = (popup) => {
  popup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
};

export const setCloseModalEventListener = (modalWindow) => {
  modalWindow.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {
      closeModal(modalWindow);
    }
  });
};

export default {};
