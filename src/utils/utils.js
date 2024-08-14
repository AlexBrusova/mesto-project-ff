export const awaitResponse = (buttonElement, state) => {
  if (state) {
    buttonElement.textContent = 'Сохранение...';
  } else {
    buttonElement.textContent = 'Сохранить'
  };
};