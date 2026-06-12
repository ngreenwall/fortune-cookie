import { useEffect, useRef } from "react";
import { Confetti } from "./Confetti";

type GrumCelebrationProps = {
  show: boolean;
  muted: boolean;
  onDismiss: () => void;
};

const MIN_CELEBRATION_MS = 7000;
const POST_LAUGH_BUFFER_MS = 1500;
const LAUGH_VOLUME = 0.7;

export function GrumCelebration({ show, muted, onDismiss }: GrumCelebrationProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio("/audio/grum-laugh.wav");
      audio.volume = LAUGH_VOLUME;
      audioRef.current = audio;
    }

    return () => {
      audioRef.current?.pause();
    };
  }, []);

  useEffect(() => {
    if (!show) return;

    const audio = audioRef.current;
    let dismissTimer: number | undefined;

    const scheduleDismiss = (delayMs: number) => {
      dismissTimer = window.setTimeout(onDismiss, delayMs);
    };

    const resolveDismissDelay = () => {
      if (!audio || !Number.isFinite(audio.duration) || audio.duration <= 0) {
        return MIN_CELEBRATION_MS;
      }

      return Math.max(
        MIN_CELEBRATION_MS,
        audio.duration * 1000 + POST_LAUGH_BUFFER_MS,
      );
    };

    const scheduleFromAudio = () => {
      dismissTimer = window.setTimeout(onDismiss, resolveDismissDelay());
    };

    if (!muted && audio) {
      audio.currentTime = 0;

      void audio
        .play()
        .then(() => {
          if (audio.duration > 0) {
            scheduleFromAudio();
          } else {
            audio.addEventListener("loadedmetadata", scheduleFromAudio, { once: true });
          }
        })
        .catch(() => scheduleDismiss(MIN_CELEBRATION_MS));
    } else {
      scheduleDismiss(MIN_CELEBRATION_MS);
    }

    return () => {
      if (dismissTimer !== undefined) {
        window.clearTimeout(dismissTimer);
      }
      audio?.pause();
    };
  }, [show, muted, onDismiss]);

  if (!show) return null;

  return (
    <>
      <Confetti active={show} />
      <button
        type="button"
        className="fixed inset-0 z-30 flex items-center justify-center bg-black/30 px-6"
        onClick={onDismiss}
        aria-label="Dismiss celebration"
      >
        <div
          className="max-w-sm rounded-xl bg-[var(--color-slip)] px-6 py-8 text-center shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="mb-2 text-sm uppercase tracking-widest text-[var(--color-gold)]">
            Grum&apos;s fortune!
          </p>
          <p className="mb-4 text-lg leading-relaxed text-[var(--color-navy)]">
            &ldquo;Help, help! I&apos;m a prisoner in a fortune cookie
            factory.&rdquo;
          </p>
          <p className="text-base italic text-[var(--color-navy)]/75">
            We&apos;d all giggle and laugh.
          </p>
          <p className="mt-6 text-sm text-[var(--color-navy)]/50">
            Tap anywhere to continue
          </p>
        </div>
      </button>
    </>
  );
}
