import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import styles from "./Namemodal.module.scss";

type NameModalProps = {
  moves: number;
  time: number; // seconds
  onSave: (name: string) => void;
};

function NameModal({ moves, time, onSave }: NameModalProps) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setName(event.target.value);
    setError("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // stop the page from refreshing
    event.preventDefault();

    const cleanName = name.trim();

    if (cleanName === "") {
      setError("Please enter your name.");
      return;
    }

    onSave(cleanName);
  }

  return (
    <div className={styles.overlay}>
      <form className={styles.modal} onSubmit={handleSubmit}>
        <h2 className={styles.title}>You won! </h2>
        <p className={styles.result}>
          {moves} moves in {time} seconds
        </p>

        <label className={styles.label} htmlFor="player-name">
          Enter your name
        </label>
        <input
          id="player-name"
          className={styles.input}
          type="text"
          value={name}
          onChange={handleChange}
          maxLength={20}
          autoFocus
        />

        {error && <p className={styles.error}>{error}</p>}

        <button className={styles.button} type="submit">
          Save score
        </button>
      </form>
    </div>
  );
}

export default NameModal;
