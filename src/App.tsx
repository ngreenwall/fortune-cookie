import { useState } from "react";
import { BackgroundMusic } from "./components/BackgroundMusic";
import { GameBoard } from "./components/GameBoard";
import { GrumCelebration } from "./components/GrumCelebration";
import { IntroScreen } from "./components/IntroScreen";
import { WinScreen } from "./components/WinScreen";
import { useMemoryGame } from "./hooks/useMemoryGame";

type Screen = "intro" | "playing";

export default function App() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [muted, setMuted] = useState(false);
  const [musicStarted, setMusicStarted] = useState(false);
  const game = useMemoryGame(muted);

  const toggleMute = () => setMuted((m) => !m);

  const handleStart = () => {
    game.resetGame();
    setMusicStarted(true);
    setScreen("playing");
  };

  const handlePlayAgain = () => {
    game.resetGame();
    setMusicStarted(true);
    setScreen("playing");
  };

  return (
    <>
      <BackgroundMusic
        active={musicStarted && screen !== "intro"}
        muted={muted}
        pauseForCelebration={game.grumMatched}
      />

      {screen === "intro" && (
        <IntroScreen
          muted={muted}
          onToggleMute={toggleMute}
          onStart={handleStart}
        />
      )}

      {screen === "playing" && game.isWon && !game.grumMatched && (
        <WinScreen
          muted={muted}
          onToggleMute={toggleMute}
          onPlayAgain={handlePlayAgain}
        />
      )}

      {screen === "playing" && !(game.isWon && !game.grumMatched) && (
        <div className="flex min-h-dvh items-start justify-center py-4 sm:py-8">
          <GameBoard
            cards={game.cards}
            activeSlips={game.activeSlips}
            slipsVisible={game.slipsVisible}
            mismatchCardIds={game.mismatchCardIds}
            mismatchPhase={game.mismatchPhase}
            isLocked={game.isLocked}
            muted={muted}
            onToggleMute={toggleMute}
            onCardClick={game.handleCardClick}
          />
          <GrumCelebration
            show={game.grumMatched}
            muted={muted}
            onDismiss={game.clearGrumCelebration}
          />
        </div>
      )}
    </>
  );
}
