import { $audioPlayer, $musicButton, $iconSpan } from "../utils/dom.js";

let isPlaying = true;
let musicInitialized;

const toggleMusic = () => {
  if (!$audioPlayer || !$iconSpan) return;

  if (isPlaying) {
    $audioPlayer.pause();
    $iconSpan.textContent = "🔇";
  } else {
    $audioPlayer
      .play()
      .then(() => {
        $iconSpan.textContent = "🔊";
      })
      .catch((error) => {
        console.error("Erro ao iniciar a música:", error);
        $iconSpan.textContent = "🔇";
      });
  }
  isPlaying = !isPlaying;
};

export function initMusic() {
  if (musicInitialized || !$musicButton) return;

  $musicButton.addEventListener("click", toggleMusic);
  musicInitialized = true;
}
