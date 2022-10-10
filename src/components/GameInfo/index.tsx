import useStore from "@/store";
import { formatTime, toTitleCase } from "@/utils";
import { useEffect } from "react";
import { useElapsedTime } from "use-elapsed-time";
import { useNavigate } from "react-router-dom";
import { AiOutlinePause } from "react-icons/ai";

const GameInfo = () => {
  const navigate = useNavigate();
  const [mistakes, totalMistakes] = useStore((s) => s.mistakes);
  const difficulty = useStore((s) => s.difficulty);
  const result = useStore((s) => s.result);
  const isPaused = useStore((s) => s.isPaused);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const setTimerResetFunction = useStore((s) => s.setTimerResetFunction);
  const pauseGame = useStore((s) => s.pauseGame);
  const updateElapsedTimeSeconds = useStore((s) => s.updateElapsedTimeSeconds);

  const { elapsedTime, reset } = useElapsedTime({
    isPlaying: !isPaused,
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
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape" || isPaused) return;
      pauseGame();
      navigate("/");
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isPaused]);

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
    pauseGame();
  };

  return (
    <div className="game-info">
      <span className="game-info__difficulty">Difficulty: {toTitleCase(difficulty)}</span>
      <span className="game-info__attempts">Mistakes: {`${mistakes}/${totalMistakes}`}</span>
      <span className="game-info__time">
        <button
          className="game-info__pause-resume-button"
          onClick={handlePause}
        >
          Time: {formatTime(elapsedTime)} <AiOutlinePause />
        </button>
      </span>
    </div>
  );
};

export default GameInfo;
