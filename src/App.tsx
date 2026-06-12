import { useState } from "react";
import { GameBoard } from "./components/GameBoard";
import { GrumCelebration } from "./components/GrumCelebration";
import { IntroScreen } from "./components/IntroScreen";
import { WinScreen } from "./components/WinScreen";
import { useMemoryGame } from "./hooks/useMemoryGame";

type Screen = "intro" | "playing";

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [muted, setMuted] = useState(false);
  const game = useMemoryGame();

  const handleStart = () => {
    game.resetGame();
    setScreen("playing");
  };

  const handlePlayAgain = () => {
    game.resetGame();
    setScreen("playing");
  };

  if (screen === "intro") {
    return <IntroScreen onStart={handleStart} />;
  }

  if (game.isWon && !game.grumMatched) {
    return <WinScreen onPlayAgain={handlePlayAgain} />;
  }

  return (
    <div className="flex min-h-dvh items-start justify-center py-4 sm:items-center sm:py-8">
      <GameBoard
        cards={game.cards}
        activeSlips={game.activeSlips}
        slipsVisible={game.slipsVisible}
        mismatchCardIds={game.mismatchCardIds}
        mismatchPhase={game.mismatchPhase}
        isLocked={game.isLocked}
        muted={muted}
        onToggleMute={() => setMuted((m) => !m)}
        onCardClick={game.handleCardClick}
      />
      <GrumCelebration
        show={game.grumMatched}
        muted={muted}
        onDismiss={game.clearGrumCelebration}
      />
    </div>
  );
}
