import "./pages/index.css";

const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");

const popupProfile = document.querySelector("#profile");
const popupAddLocation = document.querySelector("#addLocation");
const popupLocationImage = document.querySelector("#locationImage");
const buttonProfileSubmit = document.querySelector("#button-profile-submit");
const buttonLocationSubmit = document.querySelector("#button-location-submit");
const nameElement = document.forms.profile.elements.name;
const aboutElement = document.querySelector("#info");
const author = document.querySelector(".profile__title");
const aboutAuthor = document.querySelector(".profile__subtitle");
const card = document.querySelector("#card").content;
const elements = document.querySelector(".elements");
const locationName = document.querySelector("#location");
const image = document.querySelector("#image");
const imageLink = popupLocationImage.querySelector(".popup__image");
const imageInfo = popupLocationImage.querySelector(".popup__image-info");

import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelecotor: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactivButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_error",
  inputErrorClassActive: "popup__item_error_active",
};

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function openPopupProfile() {
  nameElement.value = author.innerText;
  aboutElement.value = aboutAuthor.innerText;
  openPopup(popupProfile);
}

function openPopupAddLocation() {
  openPopup(popupAddLocation);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  author.textContent = nameElement.value;
  aboutAuthor.textContent = aboutElement.value;
  closePopup();
}

function renderCards() {
  initialCards.forEach(function (item) {
    elements.append(createCard(item.name, item.link));
  });
}

function createCard(cardName, cardLink) {
  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector(".elements__image");

  cardImage.src = cardLink;
  cardImage.alt = cardName;
  newCard.querySelector(".elements__subtitle").textContent = cardName;

  newCard
    .querySelector(".elements__delete-container")
    .addEventListener("click", deleteCard);

  newCard
    .querySelector(".elements__like-container")
    .addEventListener("click", addRemoveLike);

  cardImage.addEventListener("click", openImage);

  return newCard;
}

function handleNewLocationFormSubmit(evt) {
  evt.preventDefault();

  elements.prepend(createCard(locationName.value, image.value));
  evt.target.reset();
  closePopup();
}

function deleteCard(evt) {
  const currentLocation = evt.target.closest(".elements__element");
  currentLocation.remove();
}

function addRemoveLike(evt) {
  evt.target.classList.toggle("elements__like-container-liked");
}

function addEventsButtonClose() {
  document.querySelectorAll(".popup__button-close").forEach((item) => {
    item.addEventListener("click", closePopup);
  });
}

function openImage(evt) {
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  openPopup(popupLocationImage);
}

renderCards();
enableValidation(validationConfig);

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAddLocation);
popupAddLocation.addEventListener("submit", handleNewLocationFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);

addEventsButtonClose();
