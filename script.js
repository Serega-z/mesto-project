const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");
const buttonClose = document.querySelector(".popup__button-close");
const popupProfile = document.querySelector("#profile");
const popupAddLocation = document.querySelector("#addLocation");
const popupLocationImage = document.querySelector("#locationImage");
const buttonProfileSubmit = document.querySelector("#button-profile-submit");
const buttonLocationSubmit = document.querySelector("#button-location-submit");
const nameElement = document.querySelector("#Name");
const aboutElement = document.querySelector("#Info");

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

function showPopupForm(popupForm) {
  popupForm.classList.add("popup_opened");
}

createCards();

function hidePopupForm() {
  const popup = document.querySelector(".popup_opened");
  popup.classList.remove("popup_opened");
}

function showPopupProfile() {
  const author = document.querySelector(".profile__title").innerText;
  const aboutAuthor = document.querySelector(".profile__subtitle").innerText;

  nameElement.value = author;
  aboutElement.value = aboutAuthor;
  showPopupForm(popupProfile);
}

function showPopupAddLocation() {
  showPopupForm(popupAddLocation);
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  const author = document.querySelector(".profile__title");
  const aboutAuthor = document.querySelector(".profile__subtitle");

  author.textContent = nameElement.value;
  aboutAuthor.textContent = aboutElement.value;
  hidePopupForm();
}

function createCards() {
  const card = document.querySelector("#card").content;
  const elements = document.querySelector(".elements");
  initialCards.forEach(function (item) {
    const currentCard = card.cloneNode(true);

    currentCard.querySelector(".elements__image").src = item.link;
    currentCard.querySelector(".elements__subtitle").textContent = item.name;

    elements.append(currentCard);
  });
}

function addCard(evt) {
  evt.preventDefault();
  const location = document.querySelector("#location").value;
  const image = document.querySelector("#image").value;

  const card = document.querySelector("#card").content;
  const elements = document.querySelector(".elements");

  const currentCard = card.cloneNode(true);

  currentCard.querySelector(".elements__image").src = image;
  currentCard.querySelector(".elements__subtitle").textContent = location;

  elements.prepend(currentCard);

  addEvents();

  hidePopupForm();
}

function deleteCard(evt) {
  const currentLocation = evt.target.parentElement;
  currentLocation.remove();
}

function addRemoveLike(evt) {
  evt.target.classList.toggle("elements__like-container-liked");
}

function addEvents() {
  elements = document
    .querySelectorAll(".elements__delete-container")
    .forEach((item) => {
      item.addEventListener("click", deleteCard);
    });

  elements = document
    .querySelectorAll(".popup__button-close")
    .forEach((item) => {
      item.addEventListener("click", hidePopupForm);
    });

  elements = document.querySelectorAll(".elements__image").forEach((item) => {
    item.addEventListener("click", showImage);
  });
}

function showImage(evt) {
  const imageLink = popupLocationImage.querySelector(".popup__image");
  const imageInfo = popupLocationImage.querySelector(".popup__image-info");
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  showPopupForm(popupLocationImage);
}

let elements = document
  .querySelectorAll(".elements__like-container")
  .forEach((item) => {
    item.addEventListener("click", addRemoveLike);
  });

addEvents();

buttonEdit.addEventListener("click", showPopupProfile);
buttonAdd.addEventListener("click", showPopupAddLocation);
buttonLocationSubmit.addEventListener("click", addCard);
popupProfile.addEventListener("submit", formSubmitHandler);
