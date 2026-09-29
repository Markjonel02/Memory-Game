import styles from './Card.module.scss';

interface CardProps {
  index: number;
  symbol: string;
  isFaceUp: boolean;
  isMatched: boolean;
  onClick: () => void;
}

export default function Card({ index, symbol, isFaceUp, isMatched, onClick }: CardProps) {
  const classNames = [
    styles.card,
    isFaceUp ? styles.faceUp : '',
    isMatched ? styles.matched : '',
  ].join(' ');

  const label = isFaceUp
    ? `Card ${index + 1}: ${symbol}${isMatched ? ', matched' : ''}`
    : `Card ${index + 1}, face down`;

  return (
    <button
      type="button"
      className={classNames}
      onClick={onClick}
      aria-label={label}
      disabled={isMatched}
    >
      <span className={styles.inner}>
        <span className={`${styles.face} ${styles.back}`} aria-hidden="true">
          ?
        </span>
        <span className={`${styles.face} ${styles.front}`} aria-hidden="true">
          {symbol}
        </span>
      </span>
    </button>
  );
}
