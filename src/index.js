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
const buttonEditAvatarSubmit = document.querySelector(
  "#button-edit-avatar-submit"
);
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
import {
  enableValidation,
  inactiveButtonSubmit,
} from "./components/validate.js";

import {
  elements,
  createCard,
  deleteCardByID,
  checkLike,
} from "./components/card.js";

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
  changeLike,
} from "./components/api.js";

function openPopupProfile() {
  nameElement.value = author.innerText;
  aboutElement.value = aboutAuthor.innerText;
  openPopup(popupProfile);
}

function openPopupAddLocation() {
  openPopup(popupAddLocation);
  inactiveButtonSubmit(buttonLocationSubmit, validationConfig);
}

function openPopupEditAvatar() {
  openPopup(popupEditAvatar);
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonProfileSubmit.textContent;
  setLoadingInfo(true, buttonProfileSubmit, defaultText);

  editProfile(nameElement.value, aboutElement.value)
    .then((res) => {
      author.textContent = res.name;
      aboutAuthor.textContent = res.about;
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingInfo(false, buttonProfileSubmit, defaultText);
    });
}

function renderCards() {
  getCards()
    .then((result) => {
      result.forEach(function (item) {
        addCard(item);
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

export function addCard(item) {
  elements.append(
    createCard(item, openPopupDeleteCard, profileId, openImage, addRemoveLike)
  );
}

export function openPopupDeleteCard(evt) {
  popupDelete.id = evt.target.parentElement.id;
  openPopup(popupDelete);
}

function handleNewLocationFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonLocationSubmit.textContent;
  setLoadingInfo(true, buttonLocationSubmit, defaultText);
  addLocation(locationName.value, image.value)
    .then((res) => {
      elements.prepend(createCard(res));
      locationName.value = "";
      image.value = "";
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingInfo(false, buttonLocationSubmit, defaultText);
    });
}

function handleDeleteFormSubmit(evt) {
  evt.preventDefault();
  const cardId = evt.currentTarget.id;
  removeCard(cardId)
    .then((res) => {
      deleteCardByID(cardId);
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    });
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const defaultText = buttonEditAvatarSubmit.textContent;
  setLoadingInfo(true, buttonEditAvatarSubmit, defaultText);
  editAvatar()
    .then((res) => {
      authorAvatar.src = res.avatar;
      closePopup();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setLoadingInfo(false, buttonEditAvatarSubmit, defaultText);
    });
}

function addEventsButtonClose() {
  document.querySelectorAll(".popup__button-close").forEach((item) => {
    item.addEventListener("click", closePopup);
  });
}

function renderProfile() {
  getProfile().then((res) => {
    createProfile(res);
    renderCards();
  });
}

export function createProfile(res) {
  author.textContent = res.name;
  authorAvatar.src = res.avatar;
  aboutAuthor.textContent = res.about;
  profileId = res._id;
}

function setLoadingInfo(isLoading, currentButton, defaultText) {
  if (isLoading) {
    currentButton.textContent = "Сохранение...";
  } else {
    currentButton.textContent = defaultText;
  }
}

export function openImage(evt) {
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  openPopup(popupLocationImage);
}

function addRemoveLike(evt) {
  const currentElement = evt.target.closest(".elements__element");
  const elementId = currentElement.id;
  const liked = evt.target.classList.contains("elements__like-container-liked");
  const likeCount = currentElement.querySelector(".elements__like-count");

  let methodName = "PUT";
  if (liked) {
    methodName = "DELETE";
  }

  changeLike(methodName, elementId).then((res) => {
    checkLike(likeCount,evt,res);
  });
}

renderProfile();

enableValidation(validationConfig);

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAddLocation);
buttonEditAvatar.addEventListener("click", openPopupEditAvatar);
popupAddLocation.addEventListener("submit", handleNewLocationFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);
popupEditAvatar.addEventListener("submit", handleEditAvatarFormSubmit);
popupDelete.addEventListener("submit", handleDeleteFormSubmit);

addEventsButtonClose();
