import type { CookiePhase } from "../hooks/useMemoryGame";

type FortuneCookieProps = {
  phase: CookiePhase;
  showMismatchX: boolean;
  onClick: () => void;
  disabled: boolean;
};

export function FortuneCookie({
  phase,
  showMismatchX,
  onClick,
  disabled,
}: FortuneCookieProps) {
  const isOpen = phase === "open" || phase === "matched" || phase === "mismatch";
  const isHighlighted = phase === "open" || phase === "mismatch";
  const isMatched = phase === "matched";
  const isClickable = !disabled && phase === "intact";

  const cookieFill = isMatched ? "var(--color-cookie-matched)" : "var(--color-cookie)";
  const cookieStroke = isMatched
    ? "var(--color-cookie-matched-dark)"
    : "var(--color-cookie-dark)";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!isClickable}
      aria-label={isMatched ? "Matched fortune cookie" : "Fortune cookie"}
      aria-disabled={isMatched}
      className={[
        "relative flex aspect-square w-full min-h-12 touch-manipulation items-center justify-center rounded-lg transition-all duration-300",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-gold)]",
        isHighlighted ? "ring-2 ring-[var(--color-gold)] ring-offset-2 ring-offset-[var(--color-sky-bg)]" : "",
        isMatched
          ? "ring-2 ring-[var(--color-match-green)] ring-offset-2 ring-offset-[var(--color-sky-bg)] bg-[var(--color-match-green-light)]/20 animate-match-pop"
          : "",
        isClickable ? "cursor-pointer hover:scale-[1.03] active:scale-[0.97]" : "cursor-default",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <svg
        viewBox="0 0 80 56"
        className="h-full w-full max-h-14 drop-shadow-sm"
        aria-hidden="true"
      >
        {/* Left half */}
        <path
          d="M 8 44 Q 4 28 20 16 Q 36 6 40 10"
          fill={cookieFill}
          stroke={cookieStroke}
          strokeWidth="1.5"
          className="transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? "translateX(-3px) rotate(-8deg)" : "none",
          }}
        />
        {/* Right half */}
        <path
          d="M 40 10 Q 44 6 60 16 Q 76 28 72 44"
          fill={cookieFill}
          stroke={cookieStroke}
          strokeWidth="1.5"
          className="transition-all duration-300 origin-center"
          style={{
            transform: isOpen ? "translateX(3px) rotate(8deg)" : "none",
          }}
        />
        {/* Crack line when open */}
        {isOpen && (
          <line
            x1="40"
            y1="10"
            x2="40"
            y2="44"
            stroke={cookieStroke}
            strokeWidth="1"
            strokeDasharray="2 2"
            opacity="0.6"
          />
        )}
        {/* Closed cookie fold */}
        {!isOpen && phase !== "reclosing" && (
          <path
            d="M 8 44 Q 24 50 40 48 Q 56 50 72 44 Q 56 52 40 54 Q 24 52 8 44"
            fill={cookieStroke}
            opacity="0.25"
          />
        )}
      </svg>

      {isMatched && (
        <span
          className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-match-green)] text-xs font-bold text-white shadow-sm"
          aria-hidden="true"
        >
          ✓
        </span>
      )}

      {showMismatchX && (
        <span
          className="animate-x-pop absolute inset-0 flex items-center justify-center text-3xl font-bold text-red-500/90"
          aria-hidden="true"
        >
          ✕
        </span>
      )}
    </button>
  );
}
