import { useEffect, useRef } from "react";

type BackgroundMusicProps = {
  active: boolean;
  muted: boolean;
  pauseForCelebration?: boolean;
};

const BG_VOLUME = 0.2;

export function BackgroundMusic({
  active,
  muted,
  pauseForCelebration = false,
}: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio("/audio/bigband-bg.mp3");
    audio.loop = true;
    audio.volume = BG_VOLUME;
    audioRef.current = audio;

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const shouldPlay = active && !muted && !pauseForCelebration;

    if (shouldPlay) {
      void audio.play().catch(() => {
        // Blocked until user gesture — Start button satisfies this
      });
    } else {
      audio.pause();
    }
  }, [active, muted, pauseForCelebration]);

  return null;
}
