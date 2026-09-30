import type { Difficulty } from '../types/game';

export const DIFFICULTIES: Difficulty[] = [
  { label: 'Easy (2×2)', rows: 2, cols: 2 },
  { label: 'Medium (4×4)', rows: 4, cols: 4 },
  { label: 'Hardcore (6×6)', rows: 6, cols: 6 },
];

// The game starts on Easy (the first item in the list)
export const DEFAULT_DIFFICULTY = DIFFICULTIES[0];

// How long a wrong pair stays visible before flipping back (ms)
export const MISMATCH_DELAY = 800;