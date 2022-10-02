import useStore from "@/store";
import { formatTime, toTitleCase } from "@/utils";
import { useEffect } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { PauseModal } from "@/components";
import { useNavigate } from "react-router-dom";

const GameInfo = () => {
  const navigate = useNavigate();
  const [mistakes, totalMistakes] = useStore((s) => s.mistakes);
  const difficulty = useStore((s) => s.difficulty);
  const result = useStore((s) => s.result);
  const timerIsRunning = useStore((s) => s.timerIsRunning);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const setTimerResetFunction = useStore((s) => s.setTimerResetFunction);
  const pauseGame = useStore((s) => s.pauseGame);
  const updateElapsedTimeSeconds = useStore((s) => s.updateElapsedTimeSeconds);

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: timerIsRunning,
    updateInterval: 1, // in secondss
    startAt: elapsedTimeSeconds,
    onUpdate(elapsedTime) {
      updateElapsedTimeSeconds(elapsedTime);
    },
  });

  useEffect(() => {
    setTimerResetFunction(() => reset(0));
  }, [result]);


  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (!["b"].includes(e.key)) return;
      if (e.key === "b") navigate("/");
      // if (e.key === "s") // handle open settings
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  const handlePause = () => {
    pauseGame({ modalOverlay: <PauseModal /> });
  };

  return (
    <div className="game-info">
      <span className="game-info__difficulty">Difficulty: {toTitleCase(difficulty)}</span>
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
