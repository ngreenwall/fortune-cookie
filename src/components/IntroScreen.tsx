type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center px-6 py-10 text-center">
      <h1 className="mb-2 text-3xl tracking-wide text-[var(--color-navy)] sm:text-4xl">
        Fortune Cookie Match
      </h1>
      <p className="mb-8 text-lg italic text-[var(--color-navy)]/80">
        In Memory of Grum.
      </p>

      <div className="mb-10 max-w-sm space-y-3 text-left text-base leading-relaxed text-[var(--color-navy)]/90">
        <p>Fortune cookies are arranged in a grid.</p>
        <p>
          Tap a cookie. It highlights and cracks open, and its fortune appears
          on a slip below the grid.
        </p>
        <p>
          Tap a second cookie. It also cracks open, and a second slip appears
          below the first.
        </p>
        <p>Matching fortunes win the pair. Find all pairs to finish.</p>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="rounded-lg bg-[var(--color-gold)] px-8 py-3 text-lg text-white shadow-sm transition hover:brightness-105 active:scale-[0.98]"
      >
        Start
      </button>
    </div>
  );
}
