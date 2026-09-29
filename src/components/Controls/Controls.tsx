import type { Difficulty } from '../../types/game';
import DifficultySelect from '../DifficultySelect/DifficultySelect';
import Stats from '../Stats/Stats';
import styles from './Controls.module.scss';

interface ControlsProps {
  seconds: number;
  moves: number;
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onRestart: () => void;
}

export default function Controls({
  seconds,
  moves,
  difficulty,
  onDifficultyChange,
  onRestart,
}: ControlsProps) {
  return (
    <div className={styles.controls}>
      <Stats seconds={seconds} moves={moves} />
      <DifficultySelect value={difficulty} onChange={onDifficultyChange} />
      <button type="button" className={styles.restart} onClick={onRestart}>
        Restart
      </button>
    </div>
  );
}
