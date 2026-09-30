import { useState } from "react";

import type { Score } from "../../types/score";

import { getTopScores } from "../../utils/Leaderboardstorage";

import styles from "./Leaderboard.module.scss";

type LeaderboardProps = {
  scores: Score[];
  levels: string[];
  onClose: () => void; // called when the popup should close
};

// Turn seconds into m:ss
// Example: 75 -> 1:15
function formatTime(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const paddedSeconds = seconds < 10 ? "0" + seconds : String(seconds);

  return minutes + ":" + paddedSeconds;
}

function Leaderboard({ scores, levels, onClose }: LeaderboardProps) {
  /*
   * Only one difficulty is displayed at a time.
   */
  const [selectedLevel, setSelectedLevel] = useState(levels[0] ?? "");

  /*
   * Get scores only for the currently selected difficulty.
   */
  const topScores = selectedLevel ? getTopScores(scores, selectedLevel) : [];

  return (
    // Dark background: clicking it closes the popup
    <div className={styles.overlay} onClick={onClose}>
      {/* The leaderboard box: stopPropagation so clicking inside does not close it */}
      <div
        className={styles.leaderboard}
        onClick={(event) => event.stopPropagation()}
      >
        {/* ================================
            CLOSE BUTTON
        ================================= */}

        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close leaderboard"
        >
          ✕
        </button>

        {/* ================================
            TITLE
        ================================= */}

        <h2 className={styles.title}>Leaderboard</h2>

        {/* ================================
            DIFFICULTY SELECTOR
        ================================= */}

        <div className={styles.levelSelector}>
          {levels.map((level) => (
            <button
              key={level}
              type="button"
              className={`${styles.levelButton} ${
                selectedLevel === level ? styles.activeLevel : ""
              }`}
              onClick={() => setSelectedLevel(level)}
            >
              {level}
            </button>
          ))}
        </div>

        {/* ================================
            CURRENT DIFFICULTY
        ================================= */}

        {selectedLevel && (
          <div className={styles.section}>
            <h3 className={styles.levelTitle}>{selectedLevel}</h3>

            {topScores.length === 0 ? (
              <p className={styles.empty}>No scores yet.</p>
            ) : (
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Moves</th>
                    <th>Time</th>
                  </tr>
                </thead>

                <tbody>
                  {topScores.map((score, index) => (
                    <tr key={`${score.name}-${index}`}>
                      <td>{index + 1}</td>

                      <td>{score.name}</td>

                      <td>{score.moves}</td>

                      <td>{formatTime(score.time)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
