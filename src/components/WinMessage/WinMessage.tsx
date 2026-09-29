import { formatTime } from '../../utils/formatTime';
import styles from './WinMessage.module.scss';

interface WinMessageProps {
  moves: number;
  seconds: number;
}

export default function WinMessage({ moves, seconds }: WinMessageProps) {
  // role="status" so screen readers announce it when it appears
  return (
    <p className={styles.message} role="status">
      🎉 You won in {moves} moves and {formatTime(seconds)}!
    </p>
  );
}
