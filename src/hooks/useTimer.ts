import { useCallback, useEffect, useState } from 'react';

export function useTimer(isRunning: boolean) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const reset = useCallback(() => setSeconds(0), []);

  return { seconds, reset };
}
