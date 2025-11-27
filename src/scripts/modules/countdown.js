import { $daysLeft } from "../utils/dom.js";

const ALICE_BIRTHDAY_DATE = new Date("2025-12-14 14:00:00").getTime();

function actualizeCount() {
  const now = Date.now();
  const diff = ALICE_BIRTHDAY_DATE - now;

  if (diff < 0) {
    if ($daysLeft) $daysLeft.textContent = "0";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if ($daysLeft) $daysLeft.textContent = days;
}

export function initCountdown() {
  actualizeCount();
  setInterval(actualizeCount, 1000 * 60 * 60);
}
