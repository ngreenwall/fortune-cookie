import { useCallback, useMemo, useState } from "react";
import { FORTUNE_DEFINITIONS, type FortuneDefinition } from "../data/fortunes";
import { playCookieCrack } from "../utils/playCookieCrack";
import { shuffle } from "../utils/shuffle";

export type CookiePhase =
  | "intact"
  | "open"
  | "mismatch"
  | "reclosing"
  | "matched";

export type CookieCard = {
  id: number;
  fortuneId: string;
  text: string;
  isGrumFortune: boolean;
  phase: CookiePhase;
};

export type SlipEntry = {
  cardId: number;
  text: string;
};

export type MismatchPhase = "none" | "read" | "x" | "slips-out" | "reclose";

const READ_PAUSE_MS = 800;
const X_PAUSE_MS = 500;
const SLIPS_OUT_MS = 300;
const RECLOSE_MS = 400;

function buildDeck(definitions: FortuneDefinition[]): CookieCard[] {
  const pairs = definitions.flatMap((fortune) => [
    {
      fortuneId: fortune.id,
      text: fortune.text,
      isGrumFortune: Boolean(fortune.isGrumFortune),
    },
    {
      fortuneId: fortune.id,
      text: fortune.text,
      isGrumFortune: Boolean(fortune.isGrumFortune),
    },
  ]);

  return shuffle(pairs).map((pair, index) => ({
    id: index,
    fortuneId: pair.fortuneId,
    text: pair.text,
    isGrumFortune: pair.isGrumFortune,
    phase: "intact" as const,
  }));
}

export function useMemoryGame(muted = false) {
  const [cards, setCards] = useState<CookieCard[]>(() => buildDeck(FORTUNE_DEFINITIONS));
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [activeSlips, setActiveSlips] = useState<SlipEntry[]>([]);
  const [slipsVisible, setSlipsVisible] = useState(true);
  const [mismatchPhase, setMismatchPhase] = useState<MismatchPhase>("none");
  const [isLocked, setIsLocked] = useState(false);
  const [grumMatched, setGrumMatched] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);

  const isWon = matchedPairs === FORTUNE_DEFINITIONS.length;

  const resetGame = useCallback(() => {
    setCards(buildDeck(FORTUNE_DEFINITIONS));
    setSelectedIds([]);
    setActiveSlips([]);
    setSlipsVisible(true);
    setMismatchPhase("none");
    setIsLocked(false);
    setGrumMatched(false);
    setMatchedPairs(0);
  }, []);

  const runMismatchSequence = useCallback((firstId: number, secondId: number) => {
    setIsLocked(true);
    setMismatchPhase("read");

    window.setTimeout(() => {
      setMismatchPhase("x");
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, phase: "mismatch" }
            : card,
        ),
      );
    }, READ_PAUSE_MS);

    window.setTimeout(() => {
      setMismatchPhase("slips-out");
      setSlipsVisible(false);
    }, READ_PAUSE_MS + X_PAUSE_MS);

    window.setTimeout(() => {
      setMismatchPhase("reclose");
      setActiveSlips([]);
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, phase: "reclosing" }
            : card,
        ),
      );
    }, READ_PAUSE_MS + X_PAUSE_MS + SLIPS_OUT_MS);

    window.setTimeout(() => {
      setCards((prev) =>
        prev.map((card) =>
          card.id === firstId || card.id === secondId
            ? { ...card, phase: "intact" }
            : card,
        ),
      );
      setSelectedIds([]);
      setSlipsVisible(true);
      setMismatchPhase("none");
      setIsLocked(false);
    }, READ_PAUSE_MS + X_PAUSE_MS + SLIPS_OUT_MS + RECLOSE_MS);
  }, []);

  const handleCardClick = useCallback(
    (cardId: number) => {
      if (isLocked || isWon) return;

      const card = cards.find((c) => c.id === cardId);
      if (!card || card.phase !== "intact") return;

      if (selectedIds.includes(cardId)) return;

      if (selectedIds.length === 0) {
        playCookieCrack(muted);
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, phase: "open" } : c)),
        );
        setSelectedIds([cardId]);
        setActiveSlips([{ cardId, text: card.text }]);
        return;
      }

      if (selectedIds.length === 1) {
        const firstId = selectedIds[0];
        const firstCard = cards.find((c) => c.id === firstId);
        if (!firstCard) return;

        playCookieCrack(muted);
        setCards((prev) =>
          prev.map((c) => (c.id === cardId ? { ...c, phase: "open" } : c)),
        );
        setActiveSlips([
          { cardId: firstId, text: firstCard.text },
          { cardId, text: card.text },
        ]);
        setSelectedIds([firstId, cardId]);

        if (firstCard.fortuneId === card.fortuneId) {
          setIsLocked(true);
          const isGrum = card.isGrumFortune;

          window.setTimeout(() => {
            setActiveSlips([]);
            setSelectedIds([]);
            setCards((prev) =>
              prev.map((c) =>
                c.id === firstId || c.id === cardId
                  ? { ...c, phase: "matched" }
                  : c,
              ),
            );
            setMatchedPairs((count) => count + 1);
            if (isGrum) setGrumMatched(true);
            setIsLocked(false);
          }, 400);
        } else {
          runMismatchSequence(firstId, cardId);
        }
      }
    },
    [cards, isLocked, isWon, muted, runMismatchSequence, selectedIds],
  );

  const clearGrumCelebration = useCallback(() => {
    setGrumMatched(false);
  }, []);

  const mismatchCardIds = useMemo(() => {
    if (mismatchPhase === "none") return new Set<number>();
    return new Set(selectedIds);
  }, [mismatchPhase, selectedIds]);

  return {
    cards,
    activeSlips,
    slipsVisible,
    mismatchPhase,
    mismatchCardIds,
    isLocked,
    grumMatched,
    matchedPairs,
    totalPairs: FORTUNE_DEFINITIONS.length,
    isWon,
    handleCardClick,
    resetGame,
    clearGrumCelebration,
  };
}
