import type { SlipEntry } from "../hooks/useMemoryGame";

type FortuneSlipPanelProps = {
  slips: SlipEntry[];
  visible: boolean;
};

export function FortuneSlipPanel({ slips, visible }: FortuneSlipPanelProps) {
  return (
    <div
      className="mt-3 flex min-h-[7.5rem] w-full flex-col items-center gap-2 px-1"
      aria-live="polite"
      aria-atomic="true"
    >
      {slips.map((slip, index) => (
        <div
          key={`${slip.cardId}-${index}`}
          className={[
            "w-full max-w-md rounded-md border border-stone-200/80 bg-[var(--color-slip)] px-4 py-3 text-center shadow-sm",
            visible ? "animate-slip-in" : "animate-slip-out",
          ].join(" ")}
        >
          <p className="text-base leading-relaxed text-[var(--color-navy)] sm:text-lg">
            {slip.text}
          </p>
        </div>
      ))}
    </div>
  );
}
