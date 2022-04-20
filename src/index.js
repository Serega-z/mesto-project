import "./pages/index.css";

import { openPopup, closePopup } from "./components/modal.js";

import {
  validationConfig,
  elements,
  imageLink,
  imageInfo,
  author,
  authorAvatar,
  aboutAuthor,
  locationName,
  image,
  nameElement,
  aboutElement,
  buttonAdd,
  buttonEdit,
  buttonEditAvatar,
  buttonProfileSubmit,
  buttonLocationSubmit,
  buttonEditAvatarSubmit,
  popupAddLocation,
  popupEditAvatar,
  popupDelete,
  popupLocationImage,
  popupProfile,
} from "./components/constants.js";

import {
  enableValidation,
  inactiveButtonSubmit,
} from "./components/validate.js";

import {
  
  createCard,
  deleteCardByID,
  checkLike,
} from "./components/card.js";

import {
  getProfile,
  editAvatar,
  editProfile,
  addLocation,
  getCards,
  removeCard,
  changeLike,
} from "./components/api.js";

let currentUserId = "";

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
    createCard(item, openPopupDeleteCard, currentUserId, openImage, addRemoveLike)
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
  currentUserId = res._id;
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
    checkLike(likeCount, evt, res);
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
