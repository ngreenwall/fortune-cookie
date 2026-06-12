import type { SlipEntry } from "../hooks/useMemoryGame";

type FortuneSlipPanelProps = {
  slips: SlipEntry[];
  visible: boolean;
};

export function FortuneSlipPanel({ slips, visible }: FortuneSlipPanelProps) {
  const slots: (SlipEntry | null)[] = [slips[0] ?? null, slips[1] ?? null];

  return (
    <div
      className="mt-3 grid w-full grid-rows-2 gap-2 px-1"
      style={{ minHeight: "12.5rem" }}
      aria-live="polite"
      aria-atomic="true"
    >
      {slots.map((slip, index) => (
        <div
          key={slip ? `${slip.cardId}-${index}` : `empty-${index}`}
          className={[
            "flex min-h-[5.75rem] items-center justify-center",
            !slip ? "invisible" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden={!slip}
        >
          {slip && (
            <div
              className={[
                "w-full max-w-md rounded-md border border-stone-200/80 bg-[var(--color-slip)] px-4 py-3 text-center shadow-sm",
                visible ? "animate-slip-in" : "animate-slip-out",
              ].join(" ")}
            >
              <p className="text-base leading-relaxed text-[var(--color-navy)] sm:text-lg">
                {slip.text}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
