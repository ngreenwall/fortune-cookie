import type { CookieCard, SlipEntry } from "../hooks/useMemoryGame";
import { FortuneCookie } from "./FortuneCookie";
import { FortuneSlipPanel } from "./FortuneSlipPanel";
import { MuteButton } from "./MuteButton";

type GameBoardProps = {
  cards: CookieCard[];
  activeSlips: SlipEntry[];
  slipsVisible: boolean;
  mismatchCardIds: Set<number>;
  mismatchPhase: string;
  isLocked: boolean;
  muted: boolean;
  onToggleMute: () => void;
  onCardClick: (id: number) => void;
};

export function GameBoard({
  cards,
  activeSlips,
  slipsVisible,
  mismatchCardIds,
  mismatchPhase,
  isLocked,
  muted,
  onToggleMute,
  onCardClick,
}: GameBoardProps) {
  const showX = mismatchPhase === "x" || mismatchPhase === "slips-out" || mismatchPhase === "reclose";

  return (
    <div className="flex w-full max-w-md flex-col items-center px-4">
      <div className="mb-2 flex w-full items-center justify-between">
        <h1 className="text-lg font-normal tracking-wide text-[var(--color-navy)]">
          Fortune Cookie Match
        </h1>
        <MuteButton muted={muted} onToggle={onToggleMute} />
      </div>

      <div className="grid w-full grid-cols-4 gap-2 sm:gap-3">
        {cards.map((card) => (
          <FortuneCookie
            key={card.id}
            phase={card.phase}
            showMismatchX={showX && mismatchCardIds.has(card.id)}
            onClick={() => onCardClick(card.id)}
            disabled={isLocked}
          />
        ))}
      </div>

      <FortuneSlipPanel slips={activeSlips} visible={slipsVisible} />
    </div>
  );
}
