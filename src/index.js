import "./pages/index.css";

const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");

const popupProfile = document.querySelector("#profile");
const popupEditAvatar = document.querySelector("#editAvatar");
const buttonEditAvatar = document.querySelector(".profile__button_edit-avatar");
export const popupDelete = document.querySelector("#deleteCard");
const popupAddLocation = document.querySelector("#addLocation");
export const popupLocationImage = document.querySelector("#locationImage");
const buttonProfileSubmit = document.querySelector("#button-profile-submit");
const buttonLocationSubmit = document.querySelector("#button-location-submit");
const buttonEditAvatarSubmit = document.querySelector("#button-edit-avatar-submit");
const nameElement = document.forms.profile.elements.name;
const aboutElement = document.querySelector("#info");


const card = document.querySelector("#card").content;

const locationName = document.querySelector("#location");
const image = document.querySelector("#image");
export const imageLink = popupLocationImage.querySelector(".popup__image");
export const imageInfo = popupLocationImage.querySelector(".popup__image-info");

export const author = document.querySelector(".profile__title");
export const authorAvatar = document.querySelector(".profile__avatar");
export const aboutAuthor = document.querySelector(".profile__subtitle");

export let profileId;

import { openPopup, closePopup } from "./components/modal.js";
import { enableValidation } from "./components/validate.js";
import { elements, createCard } from './components/card.js'

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelecotor: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_error",
  inputErrorClassActive: "popup__item_error_active",
  activePopupClass: "popup_opened",
};

import {
  getProfile,
  editAvatar,
  editProfile,
  addLocation,
  getCards,
  removeCard,
} from "./components/api.js";

function openPopupProfile() {
  nameElement.value = author.innerText;
  aboutElement.value = aboutAuthor.innerText;
  openPopup(popupProfile);
}

function openPopupAddLocation() {
  openPopup(popupAddLocation);
  inactiveButtonSubmit(buttonLocationSubmit);
}

function openPopupEditAvatar() {
  openPopup(popupEditAvatar);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonProfileSubmit.textContent;
  setLoadingInfo(true, buttonProfileSubmit, defaultText);

  editProfile(nameElement.value, aboutElement.value).then((res) => {
    author.textContent = res.name;
    aboutAuthor.textContent = res.about;
    setLoadingInfo(false, buttonProfileSubmit, defaultText);
    closePopup();
  });
  

}

function renderCards() {
  getCards().then((result) => {
    result.forEach(function (item) {
      addCard(item);
    });
  });
}

export function addCard(item) {
  elements.append(createCard(item));
}

export function deleteCard(evt) {
  popupDelete.id = evt.target.parentElement.id;
  openPopup(popupDelete);
}

function handleNewLocationFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonLocationSubmit.textContent;
  setLoadingInfo(true, buttonLocationSubmit, defaultText);
  addLocation(locationName.value, image.value).then((res) => {
    elements.prepend(createCard(res));
    locationName.value = "";
    image.value = "";
  });
  setLoadingInfo(false, buttonLocationSubmit, defaultText);
  closePopup();
}

function handleDeleteFormSubmit(evt) {
  evt.preventDefault();
  const cardId = evt.currentTarget.id;
  removeCard(cardId).then((res) => {
    // evt.target.id = "";
    const currentLocation = document.getElementById(cardId);
    currentLocation.remove();
    closePopup();
  });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonEditAvatarSubmit.textContent;
  setLoadingInfo(true, buttonEditAvatarSubmit, defaultText);
  editAvatar().then((res) => {
    authorAvatar.src = res.avatar;
    setLoadingInfo(false, buttonEditAvatarSubmit, defaultText);
    closePopup();
  });
}

function addEventsButtonClose() {
  document.querySelectorAll(".popup__button-close").forEach((item) => {
    item.addEventListener("click", closePopup);
  });
}

function renderProfile() {
  getProfile().then((res) => createProfile(res));
}

export function createProfile(res) {
  author.textContent = res.name;
  authorAvatar.src = res.avatar;
  aboutAuthor.textContent = res.about;
  profileId = res._id;
}

function inactiveButtonSubmit(buttonElement) {
  buttonElement.classList.add(validationConfig.inactiveButtonClass);  
}

function setLoadingInfo(isLoading, currentButton, defaultText) {

  if (isLoading) {
    currentButton.textContent = "Сохранение..."; 
  }
  else {
    currentButton.textContent = defaultText; 
  }
}

renderCards();
enableValidation(validationConfig);
renderProfile();

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAddLocation);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);
popupAddLocation.addEventListener("submit", handleNewLocationFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);
popupEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
popupDelete.addEventListener("submit", handleDeleteFormSubmit);

addEventsButtonClose();
