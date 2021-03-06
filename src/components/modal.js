import { validationConfig } from "./constants.js";

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


