let crackAudio: HTMLAudioElement | null = null;

export function playCookieCrack(muted: boolean) {
  if (muted) return;

  if (!crackAudio) {
    crackAudio = new Audio("/audio/cookie-crack.wav");
    crackAudio.volume = 0.55;
  }

  crackAudio.currentTime = 0;
  void crackAudio.play().catch(() => {
    // Autoplay or missing file — game continues without sound
  });
}
