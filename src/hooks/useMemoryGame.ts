import { useEffect, useState } from 'react';
import { DEFAULT_DIFFICULTY, MISMATCH_DELAY } from '../constants/difficulty';
import type { CardData, Difficulty } from '../types/game';
import { createDeck } from '../utils/deck';
import { useTimer } from './useTimer';

export function useMemoryGame() {
  const [difficulty, setDifficulty] = useState<Difficulty>(DEFAULT_DIFFICULTY);
  const [cards, setCards] = useState<CardData[]>(() =>
    createDeck(DEFAULT_DIFFICULTY.rows, DEFAULT_DIFFICULTY.cols)
  );
  // ids of cards currently flipped but not matched yet (0, 1 or 2)
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const isWon = cards.every((card) => card.isMatched);
  const isLocked = flippedIds.length === 2; // ignore clicks while checking a pair

  // timer starts on first flip and stops when the last pair is matched
  const { seconds, reset: resetTimer } = useTimer(hasStarted && !isWon);

  // When two cards are flipped, check if they match
  useEffect(() => {
    if (flippedIds.length !== 2) return;

    const [first, second] = flippedIds.map((id) =>
      cards.find((card) => card.id === id)
    );

    if (first && second && first.symbol === second.symbol) {
      setCards((prev) =>
        prev.map((card) =>
          flippedIds.includes(card.id) ? { ...card, isMatched: true } : card
        )
      );
      setFlippedIds([]);
      return;
    }

    // no match: flip them back after a short delay
    const timeoutId = setTimeout(() => setFlippedIds([]), MISMATCH_DELAY);
    return () => clearTimeout(timeoutId);
  }, [flippedIds]); // eslint-disable-line react-hooks/exhaustive-deps

  const flipCard = (id: number) => {
    const card = cards.find((c) => c.id === id);
    if (!card || isLocked || card.isMatched || flippedIds.includes(id)) return;

    setHasStarted(true);
    // a "move" = a pair of flips, so count it on the second card
    if (flippedIds.length === 1) setMoves((m) => m + 1);
    setFlippedIds((prev) => [...prev, id]);
  };

  const startNewGame = (level: Difficulty) => {
    setCards(createDeck(level.rows, level.cols));
    setFlippedIds([]);
    setMoves(0);
    setHasStarted(false);
    resetTimer();
  };

  const restart = () => startNewGame(difficulty);

  const changeDifficulty = (level: Difficulty) => {
    setDifficulty(level);
    startNewGame(level);
  };

  return {
    cards,
    flippedIds,
    difficulty,
    moves,
    seconds,
    isWon,
    flipCard,
    restart,
    changeDifficulty,
  };
}
