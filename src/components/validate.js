function showInputError(formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.add("popup__item_error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__item_error_active");
  }
  
  function hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  
    inputElement.classList.remove("popup__item_error");
    errorElement.classList.remove("popup__item_error_active");
    errorElement.textContent = "";
  }
  
  function isValid(formElement, inputElement) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      hideInputError(formElement, inputElement);
    }
  }
  
  export function setEventListeners(formElement) {
    const inputList = Array.from(formElement.querySelectorAll(".popup__item"));
  
    const buttonElement = formElement.querySelector(".popup__button");
  
    toggleButtonState(inputList, buttonElement);
  
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        isValid(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
      });
    });
  }
  

  
  function hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
  
  function toggleButtonState(inputList, buttonElement) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.add("popup__button_inactive");
      buttonElement.disabled = "disabled";
    } else {
      buttonElement.classList.remove("popup__button_inactive");
      buttonElement.disabled = "";
    }
  }