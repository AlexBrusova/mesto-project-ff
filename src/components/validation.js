const showInputError = (formElement, inputElement, inputErrorClass, errorClass, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  inputElement.classList.add(`${inputErrorClass}`);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(`${errorClass}`);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => { 
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(`${inputErrorClass}`)
  errorElement.classList.remove(`${errorClass}`)
  errorElement.textContent = ''
}

const checkInputVadility = (formElement, inputElement, inputErrorClass, errorClass) => {
  if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage)
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.dataset.errorMessage)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)
    inputElement.setCustomValidity("")
}

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputErrorClass, errorClass, inputElement.validationMessage)
  } else {
    hideInputError(formElement, inputElement, inputErrorClass, errorClass)  
  }
}

const hasInvalidInput = (inputList) => inputList.some((inputElement) => !inputElement.validity.valid);

const toggleButtonState = (formElement, inputList, submitButtonSelector, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    formElement.querySelector(`${submitButtonSelector}`).classList.add(inactiveButtonClass);
    formElement.querySelector(`${submitButtonSelector}`).disabled = true;
  } else {
    formElement.querySelector(`${submitButtonSelector}`).classList.remove(inactiveButtonClass);
    formElement.querySelector(`${submitButtonSelector}`).disabled = false;
  }
};

const setEventListeners = (
  formElement,
  inputSelector,
  inputErrorClass,
  errorClass,
  submitButtonSelector,
  inactiveButtonClass
) => {
  const inputList = Array.from(formElement.querySelectorAll(`${inputSelector}`));

  toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputVadility(formElement, inputElement, inputErrorClass, errorClass);
      toggleButtonState(formElement, inputList, submitButtonSelector, inactiveButtonClass);
    });
  });
};

export const enableValidation = (validateParams) => {
  const formSelector = Object.values(validateParams)[0];
  const inputSelector = Object.values(validateParams)[1];
  const submitButtonSelector = Object.values(validateParams)[2];
  const inactiveButtonClass = Object.values(validateParams)[3];
  const inputErrorClass = Object.values(validateParams)[4];
  const errorClass = Object.values(validateParams)[5];

  const formList = Array.from(document.querySelectorAll(`${formSelector}`));

  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    setEventListeners(
      formElement,
      inputSelector,
      inputErrorClass,
      errorClass,
      submitButtonSelector,
      inactiveButtonClass
    );
  });
};

export function clearValidation(formElement, config) {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const submitButton = formElement.querySelector(config.submitButtonSelector);

  inputList.forEach((inputElement) => {
      const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
      if (errorElement) {
          errorElement.textContent = ''; // Очищаем текст ошибки
      }
      inputElement.classList.remove(config.inputErrorClass); // Убираем класс ошибки
  });

  // Деактивируем кнопку
  submitButton.classList.add(config.inactiveButtonClass);
  submitButton.disabled = true;
}

export default { enableValidation, clearValidation };
