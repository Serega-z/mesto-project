const buttonEdit = document.querySelector(".profile__button_edit");
const buttonAdd = document.querySelector(".profile__button_add");

const popupProfile = document.querySelector("#profile");
const popupAddLocation = document.querySelector("#addLocation");
const popupLocationImage = document.querySelector("#locationImage");
const buttonProfileSubmit = document.querySelector("#button-profile-submit");
const buttonLocationSubmit = document.querySelector("#button-location-submit");
const nameElement = document.querySelector("#Name");
const aboutElement = document.querySelector("#Info");
const author = document.querySelector(".profile__title");
const aboutAuthor = document.querySelector(".profile__subtitle");
const card = document.querySelector("#card").content;
const elements = document.querySelector(".elements");
const locationName = document.querySelector("#location");
const image = document.querySelector("#image");

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

function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
}

function closePopup() {
  const popup = document.querySelector(".popup_opened");

  if (popup) {
    popup.classList.remove("popup_opened");
  }
}

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

function createCards() {
  initialCards.forEach(function (item) {
    elements.append(createCard(item.name, item.link));
  });
}

function createCard(cardName, cardLink) {
  const newCard = card.cloneNode(true);

  newCard.querySelector(".elements__image").src = cardLink;
  newCard.querySelector(".elements__image").alt = cardName;
  newCard.querySelector(".elements__subtitle").textContent = cardName;

  newCard
    .querySelector(".elements__delete-container")
    .addEventListener("click", deleteCard);

  newCard
    .querySelector(".elements__like-container")
    .addEventListener("click", addRemoveLike);

  newCard
    .querySelector(".elements__image")
    .addEventListener("click", openImage);

  return newCard;
}

function handleNewLocationFormSubmit(evt) {
  
  evt.preventDefault();

  elements.prepend(createCard(locationName.value, image.value));

  locationName.value = "";
  image.value = "";
  closePopup();
}

function deleteCard(evt) {
  const currentLocation = evt.target.parentElement;
  currentLocation.remove();
}

function addRemoveLike(evt) {
  evt.target.classList.toggle("elements__like-container-liked");
}

function addEventsButtonClose() {
  
   document
    .querySelectorAll(".popup__button-close")
    .forEach((item) => {
      item.addEventListener("click", closePopup);
    });

}

function openImage(evt) {
  const imageLink = popupLocationImage.querySelector(".popup__image");
  const imageInfo = popupLocationImage.querySelector(".popup__image-info");
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  openPopup(popupLocationImage);
}


createCards();

buttonEdit.addEventListener("click", openPopupProfile);
buttonAdd.addEventListener("click", openPopupAddLocation);
popupAddLocation.addEventListener("submit", handleNewLocationFormSubmit);
popupProfile.addEventListener("submit", handleProfileFormSubmit);

addEventsButtonClose();


