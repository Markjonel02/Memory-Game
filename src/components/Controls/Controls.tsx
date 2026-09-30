import type { Difficulty } from "../../types/game";
import DifficultySelect from "../DifficultySelect/DifficultySelect";
import Stats from "../Stats/Stats";
import styles from "./Controls.module.scss";

interface ControlsProps {
  seconds: number;
  moves: number;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onRestart: () => void;
  onLeaderboardClick: () => void;
}

export default function Controls({
  seconds,
  moves,
  difficulty,
  onDifficultyChange,
  onRestart,
  onLeaderboardClick,
}: ControlsProps) {
  return (
    <div className={styles.controls}>
      <Stats seconds={seconds} moves={moves} />
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.restart}
          onClick={onLeaderboardClick}
        >
          Leaderboard
        </button>
        <button type="button" className={styles.restart} onClick={onRestart}>
          Restart
        </button>
      </div>{" "}
      <DifficultySelect value={difficulty} onChange={onDifficultyChange} />
    </div>
  );
}
