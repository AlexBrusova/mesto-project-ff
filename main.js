/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   cardsContainer: () => (/* binding */ cardsContainer),\n/* harmony export */   createCard: () => (/* binding */ createCard),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   handleLike: () => (/* binding */ handleLike),\n/* harmony export */   removeCard: () => (/* binding */ removeCard)\n/* harmony export */ });\nvar cardTemplate = document.querySelector('#card-template').content; // получаю темплейт карточки, это ссылка на DOM узел\n\nvar cardsContainer = document.querySelector('.places__list'); // получаю элемент, в который мы будем вставлять темплейт карточки\n\n// Функция создания новой карточки\nfunction createCard(cardData, deleteCard, likeClickHandler, handleCardClick) {\n  var cardElement = cardTemplate.querySelector('.card').cloneNode(true); // клонирую шаблон, если убрать cloneNode(true), то будет та же самая ссылка, что и в cardTemplate. Это нужно, чтобы копировать себе шаблон и использовать его, не изменяя общий шаблон\n  var cardImage = cardElement.querySelector('.card__image'); // устанавливаю значение для изображения, устанавливаю ссылки на изображение, но уже конкретно в копии шаблона\n  var cardTitle = cardElement.querySelector('.card__title');\n\n  // Присваиваю значения для dom узла из списка карточек\n  cardTitle.textContent = cardData.name;\n  cardImage.src = cardData.link;\n  cardImage.alt = cardData.name;\n  var cardDeleteButton = cardElement.querySelector('.card__delete-button');\n  var cardLikeButton = cardElement.querySelector('.card__like-button');\n  cardLikeButton.addEventListener('click', likeClickHandler);\n  cardImage.addEventListener('click', function () {\n    handleCardClick(cardData);\n  });\n\n  // Обработка события при нажатии на кнопку удаления\n  cardDeleteButton.addEventListener('click', function () {\n    deleteCard(cardElement);\n  });\n  return cardElement;\n}\n\n// Функция удаления карточки\nfunction removeCard(cardElement) {\n  cardElement.remove();\n}\n\n// Функци лайка\nfunction handleLike(evt) {\n  evt.target.classList.toggle('card__like-button_is-active');\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\n  createCard: createCard,\n  removeCard: removeCard,\n  handleLike: handleLike,\n  cardsContainer: cardsContainer\n});\n\n//# sourceURL=webpack://yandex_praktikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   openModal: () => (/* binding */ openModal),\n/* harmony export */   setCloseModalEventListener: () => (/* binding */ setCloseModalEventListener)\n/* harmony export */ });\n// Функция закрытия модалок по нажатию на Esc\nvar handleEscClose = function handleEscClose(e) {\n  if (e.key === 'Escape' || e.key === 'Esc' || e.keyCode === 27) {\n    var activePopup = document.querySelector('.popup_is-opened');\n    closeModal(activePopup);\n  }\n};\n\n// Функция закрытия модалок\nvar closeModal = function closeModal(popup) {\n  popup.classList.remove('popup_is-opened');\n  document.removeEventListener('keydown', handleEscClose);\n};\n\n// Функция открытия модалок\nvar openModal = function openModal(popup) {\n  popup.classList.add('popup_is-opened');\n  document.addEventListener('keydown', handleEscClose);\n};\n\n// Функция закрытия модалок\nvar setCloseModalEventListener = function setCloseModalEventListener(modalWindow) {\n  modalWindow.addEventListener('mousedown', function (e) {\n    if (e.target.classList.contains('popup__close') || e.target.classList.contains('popup_is-opened')) {\n      closeModal(modalWindow);\n    }\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({});\n\n//# sourceURL=webpack://yandex_praktikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/scripts/cards.js":
/*!******************************!*\
  !*** ./src/scripts/cards.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([{\n  name: 'Архыз',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'\n}, {\n  name: 'Челябинская область',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'\n}, {\n  name: 'Иваново',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'\n}, {\n  name: 'Камчатка',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'\n}, {\n  name: 'Холмогорский район',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'\n}, {\n  name: 'Байкал',\n  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'\n}]);\n\n//# sourceURL=webpack://yandex_praktikum/./src/scripts/cards.js?");

/***/ }),

/***/ "./src/scripts/index.js":
/*!******************************!*\
  !*** ./src/scripts/index.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ \"./src/scripts/styles/index.css\");\n/* harmony import */ var _components_modal_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/modal.js */ \"./src/components/modal.js\");\n/* harmony import */ var _cards_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cards.js */ \"./src/scripts/cards.js\");\n/* harmony import */ var _components_card_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/card.js */ \"./src/components/card.js\");\n\n\n\n\nvar btnProfileAdd = document.querySelector('.profile__add-button');\nvar btnProfileEdit = document.querySelector('.profile__edit-button');\nvar popupProfileAdd = document.querySelector('.popup_type_new-card');\nvar popupProfileEdit = document.querySelector('.popup_type_edit');\n// eslint-disable-next-line\nvar body = document.body;\nvar profileName = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\nvar popupNameInput = document.querySelector('.popup__input_type_name');\nvar popupDescriptionInput = document.querySelector('.popup__input_type_description');\nvar formProfile = document.forms['edit-profile'];\nvar nameInput = popupProfileAdd.querySelector('.popup__input_type_card-name');\nvar linkInput = popupProfileAdd.querySelector('.popup__input_type_url');\nvar cardForm = document.forms['new-place'];\nvar popupImageViewer = document.querySelector('.popup_type_image');\nvar popupImage = document.querySelector('.popup__image');\nvar popupCaption = document.querySelector('.popup__caption');\n\n// Функция обработки клика по карточке\nfunction handleImageClick(item) {\n  popupImage.src = item.link;\n  popupImage.alt = item.name;\n  popupCaption.textContent = item.name;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(popupImageViewer);\n}\n\n// Вывод карточек на страницу\n_cards_js__WEBPACK_IMPORTED_MODULE_2__[\"default\"].forEach(function (cardData) {\n  var card = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.removeCard, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.handleLike, handleImageClick);\n  _components_card_js__WEBPACK_IMPORTED_MODULE_3__.cardsContainer.append(card);\n});\n\n// Обработка открытия модалки добавления новой карточки\nbtnProfileAdd.addEventListener('click', function (e) {\n  e.preventDefault();\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(popupProfileAdd);\n});\n\n// Обработка открытия модалки редактирования профиля и проброс значений в инпуты\nbtnProfileEdit.addEventListener('click', function (e) {\n  e.preventDefault();\n  popupNameInput.value = profileName.textContent;\n  popupDescriptionInput.value = profileDescription.textContent;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.openModal)(popupProfileEdit);\n});\n\n// Функция редактирования формы профиля, сохранения новых значений и вывода их на стр \nfunction handleProfileFormSubmit(evt) {\n  evt.preventDefault();\n  profileName.textContent = popupNameInput.value;\n  profileDescription.textContent = popupDescriptionInput.value;\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)(popupProfileEdit);\n}\n// Вызов функции редактирования профиля\n\nformProfile.addEventListener('submit', handleProfileFormSubmit);\n\n// Функция добавления новой карточки\nfunction addNewCard(event) {\n  event.preventDefault();\n  var cardData = {\n    name: nameInput.value,\n    link: linkInput.value\n  };\n  var newCard = (0,_components_card_js__WEBPACK_IMPORTED_MODULE_3__.createCard)(cardData, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.removeCard, _components_card_js__WEBPACK_IMPORTED_MODULE_3__.handleLike, handleImageClick);\n  _components_card_js__WEBPACK_IMPORTED_MODULE_3__.cardsContainer.prepend(newCard);\n  (0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.closeModal)(popupProfileAdd);\n  event.target.reset(); // Сброс формы после добавления карточки\n}\ncardForm.addEventListener('submit', addNewCard);\n(0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.setCloseModalEventListener)(popupProfileEdit);\n(0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.setCloseModalEventListener)(popupImageViewer);\n(0,_components_modal_js__WEBPACK_IMPORTED_MODULE_1__.setCloseModalEventListener)(popupProfileAdd);\n\n//# sourceURL=webpack://yandex_praktikum/./src/scripts/index.js?");

/***/ }),

/***/ "./src/scripts/styles/index.css":
/*!**************************************!*\
  !*** ./src/scripts/styles/index.css ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex_praktikum/./src/scripts/styles/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/scripts/index.js");
/******/ 	
/******/ })()
;