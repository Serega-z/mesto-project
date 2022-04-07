export function openImage(evt) {
  imageLink.src = evt.target.currentSrc;
  imageLink.alt = evt.target.alt;
  imageInfo.textContent = evt.target.alt;

  openPopup(popupLocationImage);
}

export function openPopup(currentPopup) {
  currentPopup.classList.add("popup_opened");
  document.addEventListener("keyup", keyHandler);
  currentPopup.addEventListener("click", mouseHandler);
}

export function closePopup() {
  const popup = document.querySelector(".popup_opened");

  if (popup) {
    popup.classList.remove("popup_opened");
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