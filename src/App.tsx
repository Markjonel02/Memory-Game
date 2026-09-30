import { useState } from "react";
import Board from "./components/Board/Board";
import Controls from "./components/Controls/Controls";
import WinMessage from "./components/WinMessage/WinMessage";
import WelcomeModal from "./components/WelcomeModal/WelcomeModal";
import NameModal from "./components/NameModal/NameModal";
import Leaderboard from "./components/Leaderboard/Leaderboard";
import { useMemoryGame } from "./hooks/useMemoryGame";
import { loadScores, saveScore } from "./utils/Leaderboardstorage";
import { DIFFICULTIES } from "./constants/difficulty";
import type { Difficulty } from "./types/game";
import styles from "./App.module.scss";

// One leaderboard section for each difficulty, taken from your constants
const LEVELS = DIFFICULTIES.map((difficulty) => difficulty.label);

export default function App() {
  const game = useMemoryGame();

  // The name of the difficulty being played, example: "Easy (2×2)"
  const currentLevel = game.difficulty.label;

  // shows the welcome popup every time the page loads
  const [showWelcome, setShowWelcome] = useState(true);

  // shows the leaderboard popup when the leaderboard button is clicked
  const [showLeaderboard, setShowLeaderboard] = useState(false);

  // all saved scores (read from localStorage when the app starts)
  const [scores, setScores] = useState(loadScores);

  // true after the player saved their name for the current win
  const [scoreSaved, setScoreSaved] = useState(false);

  function handleSaveScore(name: string) {
    const updatedScores = saveScore({
      name: name,
      moves: game.moves,
      time: game.seconds,
      difficulty: currentLevel,
    });
    setScores(updatedScores);
    setScoreSaved(true);
  }

  // reset scoreSaved so the name form shows again on the next win
  function handleRestart() {
    setScoreSaved(false);
    game.restart();
  }

  function handleDifficultyChange(level: Difficulty) {
    setScoreSaved(false);
    game.changeDifficulty(level);
  }

  return (
    <main className={styles.app}>
      <h1>Memory Game</h1>

      <Controls
        seconds={game.seconds}
        moves={game.moves}
        difficulty={game.difficulty}
        onDifficultyChange={handleDifficultyChange}
        onRestart={handleRestart}
        onLeaderboardClick={() => setShowLeaderboard(true)}
      />

      {/* the win message shows after the score is saved */}
      {game.isWon && scoreSaved && (
        <WinMessage moves={game.moves} seconds={game.seconds} />
      )}

      <Board
        cards={game.cards}
        flippedIds={game.flippedIds}
        cols={game.difficulty.cols}
        onCardClick={game.flipCard}
      />

      {showWelcome && <WelcomeModal onClose={() => setShowWelcome(false)} />}

      {showLeaderboard && (
        <Leaderboard
          scores={scores}
          levels={LEVELS}
          onClose={() => setShowLeaderboard(false)}
        />
      )}

      {/* the name form pops up when the player wins */}
      {game.isWon && !scoreSaved && (
        <NameModal
          moves={game.moves}
          time={game.seconds}
          onSave={handleSaveScore}
        />
      )}
    </main>
  );
}
