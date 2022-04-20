
import { card, elements } from "./constants.js";

export function createCard(
  res,
  openPopupDeleteCard,
  profileId,
  openImage,
  addRemoveLike
) {
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

  deleteButton.addEventListener("click", openPopupDeleteCard);

  likeContainer.addEventListener("click", addRemoveLike);

  cardImage.addEventListener("click", openImage);

  return newCard;
}

export function checkLike(likeCount, evt, res) {
  likeCount.textContent = res.likes.length;
  evt.target.classList.toggle("elements__like-container-liked");
}

export function deleteCardByID(cardId) {
  const currentLocation = document.getElementById(cardId);
  currentLocation.remove();
}
