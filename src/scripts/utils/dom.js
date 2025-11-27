export const show = (element) =>
  element && element.classList.remove("displayOff");
export const hide = (element) => element && element.classList.add("displayOff");

// dom ref
export const $audioPlayer = document.getElementById("music");
export const $musicButton = document.getElementById("musicToggleBtn");
export const $iconSpan = $musicButton
  ? $musicButton.querySelector("span")
  : null;
export const $guestCall = document.getElementById("guestCall");
export const $daysLeft = document.getElementById("daysLeft");

// containers
export const $inputContainer = document.getElementById("inputContainer");
export const $guestSelectContainer = document.getElementById("guestSelectName");
export const $inviteContainer = document.getElementById("inviteContainer");
export const $familySection = document.getElementById("familyConfirmation");
export const $confirmationSuccessfull = document.getElementById(
  "confirmationSucessfull"
);

// buttons
export const $submitButton = document.getElementById("submitButton");
export const $guestSelectBox = document.getElementById("guestSelectBox");
export const $confirmSelectedNameBtn = document.getElementById(
  "confirmSelectedName"
);
export const $confirmButton = document.getElementById("confirmation");
export const $sendBtn = document.getElementById("sendConfirmation");
export const $returnButton = document.getElementById("returnButton");
export const $familyListDiv = document.getElementById("familyList");
export const $guestInput = document.getElementById("guest");
