import styles from "./WelcomeModal.module.scss";

type WelcomeModalProps = {
  onClose: () => void;
};


const VIDEO_PATH = "/how-to-play.mp4";

function WelcomeModal({ onClose }: WelcomeModalProps) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Welcome to Memory Game!</h2>

        <video
          className={styles.video}
          src={VIDEO_PATH}
          controls
          autoPlay
          muted
          loop
        />

        <h3 className={styles.subtitle}>How to play</h3>
        <ol className={styles.list}>
          <li>Click a card to flip it.</li>
          <li>Click a second card to find its match.</li>
          <li>If the cards match, they stay open.</li>
          <li>If they don't match, they flip back.</li>
          <li>Match all pairs using the fewest moves and the shortest time.</li>
        </ol>

        <button className={styles.button} onClick={onClose}>
          Start playing
        </button>
      </div>
    </div>
  );
}

export default WelcomeModal;
