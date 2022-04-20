export const baseUrl = "https://nomoreparties.co/v1";
export const authorizationCode = "92f03e12-2aa3-473a-b069-ac84e8ecd772";
export const cohortId = "plus-cohort-8";

export var currentUserId = "";


export const card = document.querySelector("#card").content;
export const popupProfile = document.querySelector("#profile");
export const popupEditAvatar = document.querySelector("#editAvatar");
export const popupDelete = document.querySelector("#deleteCard");
export const popupAddLocation = document.querySelector("#addLocation");
export const popupLocationImage = document.querySelector("#locationImage");
export const elements = document.querySelector(".elements");
export const author = document.querySelector(".profile__title");
export const authorAvatar = document.querySelector(".profile__avatar");
export const aboutAuthor = document.querySelector(".profile__subtitle");
export const locationName = document.querySelector("#location");
export const image = document.querySelector("#image");
export const nameElement = document.forms.profile.elements.name;
export const aboutElement = document.querySelector("#info");
export const buttonEdit = document.querySelector(".profile__button_edit");
export const buttonAdd = document.querySelector(".profile__button_add");
export const buttonEditAvatar = document.querySelector(
  ".profile__button_edit-avatar"
);

export const buttonProfileSubmit = document.querySelector(
  "#button-profile-submit"
);
export const buttonLocationSubmit = document.querySelector(
  "#button-location-submit"
);
export const buttonEditAvatarSubmit = document.querySelector(
  "#button-edit-avatar-submit"
);

export const imageLink = popupLocationImage.querySelector(".popup__image");
export const imageInfo = popupLocationImage.querySelector(".popup__image-info");



export const validationConfig = {
  formSelector: ".popup__form",
  inputSelecotor: ".popup__item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_inactive",
  inputErrorClass: "popup__item_error",
  inputErrorClassActive: "popup__item_error_active",
  activePopupClass: "popup_opened",
};
