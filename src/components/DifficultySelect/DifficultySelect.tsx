import type { ChangeEvent } from 'react';
import { DIFFICULTIES } from '../../constants/difficulty';
import type { Difficulty } from '../../types/game';
import styles from './DifficultySelect.module.scss';

interface DifficultySelectProps {
  value: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

export default function DifficultySelect({ value, onChange }: DifficultySelectProps) {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selected = DIFFICULTIES.find((d) => d.label === event.target.value);
    if (selected) onChange(selected);
  };

  return (
    <label className={styles.wrapper}>
      <span className={styles.label}>Difficulty</span>
      <select className={styles.select} value={value.label} onChange={handleChange}>
        {DIFFICULTIES.map((d) => (
          <option key={d.label} value={d.label}>
            {d.label}
          </option>
        ))}
      </select>
    </label>
  );
}
