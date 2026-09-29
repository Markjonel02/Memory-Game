import { formatTime } from '../../utils/formatTime';
import styles from './Stats.module.scss';

interface StatsProps {
  seconds: number;
  moves: number;
}

export default function Stats({ seconds, moves }: StatsProps) {
  return (
    <dl className={styles.stats}>
      <div className={styles.item}>
        <dt>Time</dt>
        <dd>{formatTime(seconds)}</dd>
      </div>
      <div className={styles.item}>
        <dt>Moves</dt>
        <dd>{moves}</dd>
      </div>
    </dl>
  );
}
