import { handleEscClose } from '../scripts/index.js';

let openedPopup;

export function closeModal() {
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    openedPopup = null;
  }
}

export function openModal(popup) {
  openedPopup = popup;
  openedPopup.classList.add('popup_is-opened');
  document.addEventListener('keydown', handleEscClose);
}

export default { closeModal, openModal };
