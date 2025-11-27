import { show, hide } from "./utils/dom.js";
import {
  $guestCall,
  $inputContainer,
  $guestInput,
  $submitButton,
  $inviteContainer,
  $familySection,
  $confirmationSuccessfull,
  $returnButton,
  $guestSelectContainer,
  $guestSelectBox,
  $confirmSelectedNameBtn,
  $confirmButton,
  $familyListDiv,
  $sendBtn,
} from "./utils/dom.js";
import { listOfGuests, RENDER_URL, normalizeString } from "./utils/data.js";
import { initMusic } from "./modules/music.js";
import { initCountdown } from "./modules/countdown.js";

/**
 * @param {string} guestName
 */

function searchGuest() {
  const typedName = normalizeString($guestInput.value.trim());
  const filteredResults = [];

  if (!typedName) return;

  for (const family in listOfGuests) {
    listOfGuests[family].forEach((person) => {
      if (normalizeString(person).includes(typedName)) {
        filteredResults.push({ name: person, family: family });
      }
    });
  }
  if (filteredResults.length === 0) {
    alert("Nome não encontrado. Verifique se digitou corretamente!");
    return;
  }

  hide($inputContainer);
  show($guestSelectContainer);

  $guestSelectBox.innerHTML = "";
  filteredResults.forEach((result) => {
    const option = document.createElement("option");
    option.value = JSON.stringify(result);
    option.textContent = result.name;
    $guestSelectBox.appendChild(option);
  });
}

function confirmSelectedGuest() {
  const selectedGuest = JSON.parse($guestSelectBox.value);
  const userName = selectedGuest.name;
  const userFamily = selectedGuest.family;

  $guestCall.innerText = userName.split(" ")[0];

  hide($guestSelectContainer);
  show($inviteContainer);
  initMusic();

  window.selectedGuest = userName;
  window.selectedFamily = userFamily;
}

function confirmPresence() {
  const family = window.selectedFamily;
  const mainGuest = window.selectedGuest;
  const familyMembers = listOfGuests[family];

  console.log(familyMembers);

  if (familyMembers.length > 1) {
    const familyWithNoGuest = familyMembers.filter(
      (person) => person !== mainGuest
    );

    hide($inviteContainer);

    $familyListDiv.innerHTML = "";

    familyWithNoGuest.forEach((person) => {
      const id = `fam_${person.replace(/\s+/g, "_")}`;

      const box = `
      <label>
        <input type="checkbox" value="${person}" id="${id}">
        ${person}
      </label><br>
    `;

      $familyListDiv.insertAdjacentHTML("beforeend", box);
    });

    hide($inviteContainer);
    show($familySection);
  } else {
    alert("Aguarde 10 segundos até que a confirmação seja enviada!");

    const user = window.selectedGuest;
    const boxes = document.querySelectorAll("#familyList input[type=checkbox]");
    let confirmed = [user];

    boxes.forEach((box) => {
      if (box.checked) confirmed.push(box.value);
    });

    const payload = {
      ListaConfirmados: confirmed.join(", "),
      Timestamp: new Date().toISOString(),
    };

    fetch(RENDER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then((r) => r.text())
      .then((msg) => {
        alert("Confirmação enviada!");
        hide($inviteContainer);
        show($confirmationSuccessfull);
      })
      .catch((err) => alert("Erro ao enviar confirmação"));
  }
}

function confirmFamilyPresence() {
  const user = window.selectedGuest;
  const boxes = document.querySelectorAll("#familyList input[type=checkbox]");
  let confirmed = [user];

  alert("Aguarde 10 segundos até que a confirmação seja enviada!");

  boxes.forEach((box) => {
    if (box.checked) confirmed.push(box.value);
  });
  confirmed.sort();

  const payload = {
    ListaConfirmados: confirmed.join(", "),
    Timestamp: new Date().toISOString(),
  };

  fetch(RENDER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((r) => r.text())
    .then((msg) => {
      alert("Confirmação enviada!");
      hide($familySection);
      show($confirmationSuccessfull);
    })
    .catch((err) => alert("Erro ao enviar confirmação"));
}

function returnButton() {
  show($inviteContainer);
  hide($confirmationSuccessfull);
  hide($confirmButton);
}

$submitButton.addEventListener("click", searchGuest);
$confirmSelectedNameBtn.addEventListener("click", confirmSelectedGuest);
$confirmButton.addEventListener("click", confirmPresence);
$sendBtn.addEventListener("click", confirmFamilyPresence);
$returnButton.addEventListener("click", returnButton);

initCountdown();
