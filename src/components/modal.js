let openedPopup;

export function closeModal() {
  if (openedPopup) {
    openedPopup.classList.remove('popup_is-opened');
    openedPopup = null;
  }
}

export function openModal(popup) {
  openedPopup = popup;
  openedPopup.classList.add('popup_is-opened');
}

export default { closeModal, openModal };
