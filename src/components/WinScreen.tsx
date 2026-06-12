import { MuteButton } from "./MuteButton";

type WinScreenProps = {
  muted: boolean;
  onToggleMute: () => void;
  onPlayAgain: () => void;
};

export function WinScreen({ muted, onToggleMute, onPlayAgain }: WinScreenProps) {
  return (
    <div className="relative flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center">
      <div className="absolute right-4 top-4">
        <MuteButton muted={muted} onToggle={onToggleMute} />
      </div>
      <h2 className="mb-3 text-2xl text-[var(--color-navy)] sm:text-3xl">
        All fortunes matched!
      </h2>
      <p className="mb-2 max-w-sm text-lg italic text-[var(--color-navy)]/80">
        In Memory of Grum.
      </p>
      <p className="mb-10 max-w-sm text-base leading-relaxed text-[var(--color-navy)]/80">
        Thanks for playing. Grum would have loved sharing one more laugh over
        Chinese food.
      </p>
      <button
        type="button"
        onClick={onPlayAgain}
        className="rounded-lg bg-[var(--color-gold)] px-8 py-3 text-lg text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
      >
        Play again
      </button>
    </div>
  );
}
