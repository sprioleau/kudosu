import useStore, { TDifficulty } from "@/store";
import { formatTime } from "@/utils";
import { useEffect } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { PauseModal } from "@/components";

const GameInfo = () => {
  const [mistakes, totalMistakes] = useStore((s) => s.mistakes);
  const difficulty = useStore((s) => s.difficulty);
  const result = useStore((s) => s.result);
  const timerIsRunning = useStore((s) => s.timerIsRunning);
  const setTimerIsRunning = useStore((s) => s.setTimerIsRunning);
  const setTimerResetFunction = useStore((s) => s.setTimerResetFunction);
  const updateElapsedTimeSeconds = useStore((s) => s.updateElapsedTimeSeconds);
  const updateModalContent = useStore((s) => s.updateModalContent);

  const { elapsedTime, reset: resetElapsedTime } = useElapsedTime({
    isPlaying: timerIsRunning,
    updateInterval: 1, // seconds
    onUpdate(elapsedTime) {
      updateElapsedTimeSeconds(elapsedTime);
    },
  });

  useEffect(() => {
    setTimerResetFunction(() => resetElapsedTime(0));
  }, []);

  if (result) setTimerIsRunning(false);

  const handlePause = () => {
    setTimerIsRunning(false);
    updateModalContent(<PauseModal />);
  };

  const formatDifficulty = (difficulty: TDifficulty) => {
    return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
  };

  return (
    <div className="game-info">
      <span className="game-info__difficulty">Difficulty: {formatDifficulty(difficulty)}</span>
      <span className="game-info__attempts">Mistakes: {`${mistakes}/${totalMistakes}`}</span>
      <span
        className="game-info__time"
        onClick={handlePause}
      >
        Time: {formatTime(elapsedTime)}
      </span>
    </div>
  );
};

export default GameInfo;
