import { useEffect } from "react";
import { Confetti } from "./Confetti";

type GrumCelebrationProps = {
  show: boolean;
  muted: boolean;
  onDismiss: () => void;
};

export function GrumCelebration({ show, muted, onDismiss }: GrumCelebrationProps) {
  useEffect(() => {
    if (!show || muted) return;

    const audio = new Audio("/audio/grum-laugh.mp3");
    audio.volume = 0.7;
    void audio.play().catch(() => {
      // Autoplay policies or missing file — visual celebration still works
    });

    return () => {
      audio.pause();
    };
  }, [show, muted]);

  useEffect(() => {
    if (!show) return;

    const timer = window.setTimeout(onDismiss, 3500);
    return () => window.clearTimeout(timer);
  }, [show, onDismiss]);

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
