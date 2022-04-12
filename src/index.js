//import "./pages/index.css";

const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");
const buttonEditAvatar = document.querySelector(".profile__button_edit-avatar");

const popupProfile = document.querySelector("#profile");
const popupEditAvatar = document.querySelector("#editAvatar");
export const popupDelete = document.querySelector("#deleteCard");
const popupAddLocation = document.querySelector("#addLocation");
const nameElement = document.forms.profile.elements.name;
const aboutElement = document.querySelector("#info");
export const author = document.querySelector(".profile__title");
export const authorAvatar = document.querySelector(".profile__avatar");
export const aboutAuthor = document.querySelector(".profile__subtitle");

export const locationName = document.querySelector("#location");
export const image = document.querySelector("#image");

export let profileId;


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

import {
  getProfile,
  editAvatar,
  editProfile,
  addLocation,
  getCards,
  removeCard,
} from "./components/api.js";


import { setEventListeners } from "./components/validate.js";
import { openPopup, closePopup } from "./components/modal.js";
import { elements, createCard } from './components/card.js'

function enableValidation() {
  const formList = Array.from(document.querySelectorAll(".popup__form"));

  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement);
  });
}

function openPopupProfile() {
  nameElement.value = author.innerText;
  aboutElement.value = aboutAuthor.innerText;
  openPopup(popupProfile);
}

function openPopupAddLocation() {
  openPopup(popupAddLocation);
}

function openPopupEditAvatar() {
  openPopup(popupEditAvatar);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  editProfile(nameElement.value, aboutElement.value).then((res) => {
    author.textContent = res.name;
    aboutAuthor.textContent = res.about;
    closePopup();
  });
}

function handleNewLocationFormSubmit(evt) {
  evt.preventDefault();

  addLocation(locationName.value, image.value).then((res) => {
    elements.prepend(createCard(res));
    locationName.value = "";
    image.value = "";
  });
  closePopup();
}

function addEventsButtonClose() {
  document.querySelectorAll(".popup__button-close").forEach((item) => {
    item.addEventListener("click", closePopup);
  });
}

function renderProfile() {
  //getProfile().then((res) =>createProfile(res));
}

export function createProfile(res) {
  // author.textContent = res.name;
  // authorAvatar.src = res.avatar;
  // aboutAuthor.textContent = res.about;
  // profileId = res._id;
}

function handleDeleteFormSubmit(evt) {
  evt.preventDefault();

  removeCard(evt.currentTarget.id).then((res) => {
    evt.target.id = "";
    const currentLocation = document.getElementById(element.currentTarget.id);
    currentLocation.remove();
    closePopup();
  });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  editAvatar().then((res) => {
    authorAvatar.src = res.avatar;
    closePopup();
  });
}

export function deleteCard(evt) {
  // popupDelete.id = evt.target.parentElement.id;
  // openPopup(popupDelete);
  const currentLocation = evt.target.closest(".elements__element"); 

  currentLocation.remove(); 
}

function renderCards() {
  // getCards().then((result) => {
  //   result.forEach(function (item) {
  //     addCard(item);
  //   });
  // });
  initialCards.forEach(function (item) { 

    elements.append(createCard(item)); 

  }); 
}

export function addCard(item) {
  elements.append(createCard(item));
}

renderProfile();
renderCards();
enableValidation();

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAddLocation);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);
popupAddLocation.addEventListener("submit", handleNewLocationFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);
popupEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
popupDelete.addEventListener("submit", handleDeleteFormSubmit);

addEventsButtonClose();
