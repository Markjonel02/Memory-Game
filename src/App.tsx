import Board from './components/Board/Board';
import Controls from './components/Controls/Controls';
import WinMessage from './components/WinMessage/WinMessage';
import { useMemoryGame } from './hooks/useMemoryGame';
import styles from './App.module.scss';

export default function App() {
  const game = useMemoryGame();

  return (
    <main className={styles.app}>
      <h1>Memory Game</h1>

      <Controls
        seconds={game.seconds}
        moves={game.moves}
        difficulty={game.difficulty}
        onDifficultyChange={game.changeDifficulty}
        onRestart={game.restart}
      />

      {game.isWon && <WinMessage moves={game.moves} seconds={game.seconds} />}

      <Board
        cards={game.cards}
        flippedIds={game.flippedIds}
        cols={game.difficulty.cols}
        onCardClick={game.flipCard}
      />
    </main>
  );
}
