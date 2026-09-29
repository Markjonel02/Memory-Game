import { SYMBOLS } from '../constants/symbols';
import type { CardData } from '../types/game';
import { shuffle } from './shuffle';

export function createDeck(rows: number, cols: number): CardData[] {
  const pairCount = (rows * cols) / 2;
  const symbols = shuffle(SYMBOLS).slice(0, pairCount);

  const cards = [...symbols, ...symbols].map((symbol, index) => ({
    id: index,
    symbol,
    isMatched: false,
  }));

  return shuffle(cards);
}
