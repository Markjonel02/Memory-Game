import Leaderboard from "../Leaderboard/Leaderboard";

import type { Score } from "../../types/score";

import styles from "./LeaderboardModal.module.scss";

type LeaderboardModalProps = {
  scores: Score[];
  levels: string[];
  onClose: () => void;
};

function LeaderboardModal({ scores, levels, onClose }: LeaderboardModalProps) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close leaderboard"
        >
          ✕
        </button>

        <Leaderboard scores={scores} levels={levels} />
      </div>
    </div>
  );
}

export default LeaderboardModal;
