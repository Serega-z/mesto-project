import { validationConfig } from "../index.js";
import { imageLink, imageInfo, popupLocationImage } from "../index.js";

export function openImage(evt) {
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  openPopup(popupLocationImage);
}

export function openPopup(currentPopup) {
  currentPopup.classList.add(validationConfig.activePopupClass);
  document.addEventListener("keyup", keyHandler);
  currentPopup.addEventListener("click", mouseHandler);
}

export function closePopup() {
  const popup = document.querySelector(`.${validationConfig.activePopupClass}`);

  if (popup) {
    popup.classList.remove(validationConfig.activePopupClass);
    document.removeEventListener("keyup", keyHandler);
    popup.removeEventListener("click", mouseHandler);
  }
}

function keyHandler(evt) {
  if (evt.key === "Escape") {
    closePopup();
  }
}

function mouseHandler(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}


