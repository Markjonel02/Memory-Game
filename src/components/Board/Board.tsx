import type { CSSProperties } from 'react';
import type { CardData } from '../../types/game';
import Card from '../Card/Card';
import styles from './Board.module.scss';

interface BoardProps {
  cards: CardData[];
  flippedIds: number[];
  cols: number;
  onCardClick: (id: number) => void;
}

export default function Board({ cards, flippedIds, cols, onCardClick }: BoardProps) {
  const boardStyle = { '--cols': cols } as CSSProperties;

  return (
    <div className={styles.board} style={boardStyle}>
      {cards.map((card, index) => (
        <Card
          key={card.id}
          index={index}
          symbol={card.symbol}
          isMatched={card.isMatched}
          isFaceUp={card.isMatched || flippedIds.includes(card.id)}
          onClick={() => onCardClick(card.id)}
        />
      ))}
    </div>
  );
}
