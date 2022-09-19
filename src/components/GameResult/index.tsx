import useStore from "@/store";
import { formatTime } from "@/utils";

const GameResult = () => {
  const resetGame = useStore((s) => s.resetGame);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const result = useStore((s) => s.result);
  const updateModalContent = useStore((s) => s.updateModalContent);
  const timerResetFunction = useStore((s) => s.timerResetFunction);

  if (!result) return null;

  const handleResetGame = () => {
    resetGame();
    updateModalContent();
    timerResetFunction();
  };

  return (
    <div className="game-result">
      <h2 className="game-result__message">You {result}!</h2>
      <p className="game-result__time">Time: {formatTime(elapsedTimeSeconds)}</p>
      <button
        className="game-result__button"
        onClick={handleResetGame}
      >
        Reset
      </button>
    </div>
  );
};

export default GameResult;
