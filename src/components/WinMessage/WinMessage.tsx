import { useEffect, useState } from "react";

import { formatTime } from "../../utils/formatTime";

import styles from "./WinMessage.module.scss";

interface WinMessageProps {
  moves: number;
  seconds: number;
}

export default function WinMessage({ moves, seconds }: WinMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => {
      window.clearTimeout(timer);
    };
  }, [moves, seconds]);

  if (!visible) {
    return null;
  }

  return (
    <p className={styles.message} role="status">
      You won in {moves} moves and {formatTime(seconds)}!
    </p>
  );
}
