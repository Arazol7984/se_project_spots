import {
  config,
  resetValidation,
  toggleButtonState,
  hideInputError,
} from "./validation.js";

const initialCards = [
  {
    name: "Golden Gate Bridge",
    link: " https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileForm = editProfileModal.querySelector(".modal__form");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const previewModal = document.querySelector("#preview-modal");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");
const previewImageEl = previewModal.querySelector(".modal__image");
const previewCaptionEl = previewModal.querySelector(".modal__caption");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");

const cardsList = document.querySelector(".cards__list");

const addCardFormElement = newPostModal.querySelector(".modal__form");
const nameInput = newPostModal.querySelector("#caption-description-input");
const linkInput = newPostModal.querySelector("#card-image-input");

// Function to handle the Escape key press
const handleEscape = (evt) => {
  if (evt.key === "Escape") {
    const openedModal = document.querySelector(".modal_is-opened");
    if (openedModal) {
      closeModal(openedModal);
    }
  }
};

const handleModalMousedown = (evt) => {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
};

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", handleEscape);
  modal.addEventListener("mousedown", handleModalMousedown);
}

// Update your closeModal function
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", handleEscape);
  modal.removeEventListener("mousedown", handleModalMousedown);
}

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");

  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");
  cardLikeBtnEl.addEventListener("click", () => {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-button");
  cardDeleteBtnEl.addEventListener("click", () => {
    cardElement.remove();
  });

  cardImageEl.addEventListener("click", () => {
    previewImageEl.src = data.link;
    previewImageEl.alt = data.name;
    previewCaptionEl.textContent = data.name;
    openModal(previewModal);
  });

  return cardElement;
}

function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  closeModal(editProfileModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = {
    name: nameInput.value,
    link: linkInput.value,
  };

  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);

  // Reset the form after successful submission
  addCardFormElement.reset();
  const submitButton = addCardFormElement.querySelector(
    config.submitButtonSelector
  );
  toggleButtonState(
    [...addCardFormElement.querySelectorAll(config.inputSelector)],
    submitButton,
    config
  );
  closeModal(newPostModal);
}

editProfileBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(editProfileForm, config);
  openModal(editProfileModal);
});

newPostBtn.addEventListener("click", function () {
  addCardFormElement.reset();
  const submitButton = addCardFormElement.querySelector(
    config.submitButtonSelector
  );
  const inputList = [
    ...addCardFormElement.querySelectorAll(config.inputSelector),
  ];
  toggleButtonState(inputList, submitButton, config);
  openModal(newPostModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});
newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});
previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editProfileForm.addEventListener("submit", handleEditProfileSubmit);
addCardFormElement.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach(function (item) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});
