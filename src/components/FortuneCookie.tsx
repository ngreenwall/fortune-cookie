import { useId } from "react";
import type { CookiePhase } from "../hooks/useMemoryGame";

type FortuneCookieProps = {
  phase: CookiePhase;
  showMismatchX: boolean;
  onClick: () => void;
  disabled: boolean;
};

// Reference silhouette: domed peak, wings splaying to sharp wide bottom tips, V-notch gap
const LEFT_HALF =
  "M 40 3 C 28 5 13 11 9 23 C 6 33 7 45 9 55 L 35 49 C 36 38 38 16 40 3 Z";
const RIGHT_HALF =
  "M 40 3 C 52 5 67 11 71 23 C 74 33 73 45 71 55 L 45 49 C 44 38 42 16 40 3 Z";
const LEFT_INNER =
  "M 40 3 L 35 49 C 31 41 29 31 31 21 C 33 11 37 5 40 3 Z";
const RIGHT_INNER =
  "M 40 3 L 45 49 C 49 41 51 31 49 21 C 47 11 43 5 40 3 Z";
const CREASE_GROOVE = "M 40 5 L 38 30 L 40 34 L 42 30 Z";
const BOTTOM_OPENING_SHADOW = "M 35 49 Q 40 45 45 49 L 43 51 Q 40 48 37 51 Z";
const DOME_HIGHLIGHT = "M 22 8 Q 40 4 58 8";
const LEFT_HIGHLIGHT = "M 13 24 Q 9 32 10 42";
const RIGHT_HIGHLIGHT = "M 67 24 Q 71 32 70 42";
const LEFT_BOTTOM_RIM = "M 10 54 Q 9 48 12 42";
const RIGHT_BOTTOM_RIM = "M 70 54 Q 71 48 68 42";
const LEFT_INNER_RIM = "M 35 49 Q 24 53 11 54";
const RIGHT_INNER_RIM = "M 45 49 Q 56 53 69 54";

export function FortuneCookie({
  phase,
  showMismatchX,
  onClick,
  disabled,
}: FortuneCookieProps) {
  const uid = useId();
  const bodyGradId = `${uid}-body`;
  const innerGradId = `${uid}-inner`;

  const isOpen = phase === "open" || phase === "matched" || phase === "mismatch";
  const isHighlighted = phase === "open" || phase === "mismatch";
  const isMatched = phase === "matched";
  const isClickable = !disabled && phase === "intact";

  const cookieStroke = isMatched
    ? "var(--color-cookie-matched-dark)"
    : "var(--color-cookie-dark)";

  const bodyLight = isMatched
    ? "var(--color-match-green-light)"
    : "var(--color-cookie-light)";
  const bodyMid = isMatched ? "var(--color-cookie-matched)" : "var(--color-cookie)";
  const bodyDark = isMatched
    ? "var(--color-cookie-matched-dark)"
    : "var(--color-cookie-dark)";

  const halfTransform = (side: "left" | "right") => {
    if (!isOpen) return "none";
    return side === "left"
      ? "translateX(-3px) rotate(-8deg)"
      : "translateX(3px) rotate(8deg)";
  };

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
        <defs>
          <linearGradient id={bodyGradId} x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor={bodyLight} />
            <stop offset="35%" stopColor={bodyMid} />
            <stop offset="100%" stopColor={bodyDark} />
          </linearGradient>
          <linearGradient id={innerGradId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="var(--color-slip)" />
            <stop offset="100%" stopColor="#f5e6c8" />
          </linearGradient>
        </defs>

        {/* Left half */}
        <g
          className="transition-all duration-300 origin-center"
          style={{ transform: halfTransform("left"), transformOrigin: "40px 3px" }}
        >
          <path
            d={LEFT_HALF}
            fill={`url(#${bodyGradId})`}
            stroke={cookieStroke}
            strokeWidth="1.2"
            strokeLinejoin="miter"
            strokeMiterlimit="8"
          />
          {isOpen && (
            <path d={LEFT_INNER} fill={`url(#${innerGradId})`} opacity="0.95" />
          )}
        </g>

        {/* Right half */}
        <g
          className="transition-all duration-300 origin-center"
          style={{ transform: halfTransform("right"), transformOrigin: "40px 3px" }}
        >
          <path
            d={RIGHT_HALF}
            fill={`url(#${bodyGradId})`}
            stroke={cookieStroke}
            strokeWidth="1.2"
            strokeLinejoin="miter"
            strokeMiterlimit="8"
          />
          {isOpen && (
            <path d={RIGHT_INNER} fill={`url(#${innerGradId})`} opacity="0.95" />
          )}
        </g>

        {/* V-groove center crease when closed */}
        {!isOpen && (
          <path d={CREASE_GROOVE} fill={cookieStroke} opacity="0.35" />
        )}

        {/* Dark shadow in bottom opening (hollow interior) */}
        {!isOpen && phase !== "reclosing" && (
          <path d={BOTTOM_OPENING_SHADOW} fill={cookieStroke} opacity="0.25" />
        )}

        {/* Wing surface highlights */}
        {!isOpen && (
          <>
            <path
              d={DOME_HIGHLIGHT}
              fill="none"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d={LEFT_HIGHLIGHT}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.25"
            />
            <path
              d={RIGHT_HIGHLIGHT}
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.25"
            />
          </>
        )}

        {/* Layered dough edges at bottom */}
        {!isOpen && phase !== "reclosing" && (
          <>
            <path
              d={LEFT_BOTTOM_RIM}
              fill="none"
              stroke={cookieStroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d={RIGHT_BOTTOM_RIM}
              fill="none"
              stroke={cookieStroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.35"
            />
            <path
              d={LEFT_INNER_RIM}
              fill="none"
              stroke={cookieStroke}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.3"
            />
            <path
              d={RIGHT_INNER_RIM}
              fill="none"
              stroke={cookieStroke}
              strokeWidth="1"
              strokeLinecap="round"
              opacity="0.3"
            />
          </>
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
