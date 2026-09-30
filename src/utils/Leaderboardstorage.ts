import type { Score } from "../types/score";

// The key we use inside localStorage
const STORAGE_KEY = "memory-game-scores";

// How many players we show for each difficulty
export const TOP_PLAYERS = 5;

// Get all saved scores from localStorage
export function loadScores(): Score[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    // nothing saved yet
    if (!saved) {
      return [];
    }

    return JSON.parse(saved);
  } catch {
    // if the data is broken, just start fresh
    return [];
  }
}

// Sort scores: fewer moves is better, if tie then faster time wins
function sortScores(scores: Score[]): Score[] {
  return [...scores].sort((a, b) => {
    if (a.moves !== b.moves) {
      return a.moves - b.moves;
    }
    return a.time - b.time;
  });
}

// Add a new score, save it, and return the updated list
export function saveScore(newScore: Score): Score[] {
  const allScores = loadScores();
  allScores.push(newScore);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(allScores));
  } catch {
    // storage can be full or blocked, the game should still work
    console.log("Could not save the score");
  }

  return allScores;
}

// Get only the best 5 players of ONE difficulty
export function getTopScores(scores: Score[], difficulty: string): Score[] {
  // 1) keep only the scores of this difficulty
  const sameDifficulty = scores.filter(
    (score) => score.difficulty === difficulty,
  );

  // 2) sort them, then take the first 5
  return sortScores(sameDifficulty).slice(0, TOP_PLAYERS);
}
