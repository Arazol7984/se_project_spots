const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

const showInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMsgEl.textContent = inputEl.validationMessage;
  errorMsgEl.classList.add(errorClass);
};

const hideInputError = (formEl, inputEl, { inputErrorClass, errorClass }) => {
  const errorMsgEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMsgEl.textContent = "";
  errorMsgEl.classList.remove(errorClass);
};

const resetValidation = (formEl, config) => {
  const inputList = [...formEl.querySelectorAll(config.inputSelector)];
  const submitButton = formEl.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputEl) => {
    hideInputError(formEl, inputEl, config);
  });
};

const checkInputValidity = (formEl, inputEl, config) => {
  if (!inputEl.validity.valid) {
    return showInputError(formEl, inputEl, config);
  }
  hideInputError(formEl, inputEl, config);
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputEl) => !inputEl.validity.valid);
};

const toggleButtonState = (inputList, buttonEl, { inactiveButtonClass }) => {
  if (hasInvalidInput(inputList)) {
    buttonEl.classList.add(inactiveButtonClass);
    buttonEl.disabled = true;
    return;
  }
  buttonEl.classList.remove(inactiveButtonClass);
  buttonEl.disabled = false;
};

const setEventListeners = (formEl, config) => {
  const { inputSelector, submitButtonSelector } = config;
  const inputList = [...formEl.querySelectorAll(inputSelector)];
  const submitButton = formEl.querySelector(submitButtonSelector);

  toggleButtonState(inputList, submitButton, config);

  inputList.forEach((inputEl) => {
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, config);
      toggleButtonState(inputList, submitButton, config);
    });
  });
};

const enableValidation = (config) => {
  const { formSelector } = config;
  const formList = [...document.querySelectorAll(formSelector)];
  formList.forEach((formEl) => {
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formEl, config);
  });
};

enableValidation(config);

export {
  config,
  showInputError,
  hideInputError,
  toggleButtonState,
  resetValidation,
  enableValidation,
};
