export const elements = document.querySelector(".elements");
const card = document.querySelector("#card").content;

import { profileId, deleteCard } from "../index.js";
import { changeLike } from "./api.js";
import { openImage } from "./modal.js";

export function addCard(item) {
  elements.append(createCard(item));
}

export function createCard(res) {
  const newCard = card.cloneNode(true);
  const cardImage = newCard.querySelector(".elements__image");
  const cadrLike = newCard.querySelector(".elements__like-count");
  const newCardId = newCard.querySelector("#cardId");
  const deleteButton = newCard.querySelector(".elements__delete-container");
  const likeContainer = newCard.querySelector(".elements__like-container");

  newCardId.id = res._id;
  newCardId.name = res._id;
  cardImage.src = res.link;
  cardImage.alt = res.name;
  cadrLike.textContent = res.likes.length;

  if (res.likes.some((currentLike) => currentLike._id == profileId) == true) {
    likeContainer.classList.toggle("elements__like-container-liked");
  }

  if (res.owner._id !== profileId) {
    deleteButton.hidden = true;
  }

  newCard.querySelector(".elements__subtitle").textContent = res.name;

  newCard
    .querySelector(".elements__delete-container")
    .addEventListener("click", deleteCard);

  likeContainer.addEventListener("click", addRemoveLike);

  cardImage.addEventListener("click", openImage);

  return newCard;
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
    likeCount.textContent = res.likes.length;
    evt.target.classList.toggle("elements__like-container-liked");
  });
}
