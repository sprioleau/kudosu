import useStore from "@/store";
import { formatTime } from "@/utils";
import { DifficultySelectModal } from "@/components";

const GameResult = () => {
  const result = useStore((s) => s.result);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const updateModalContent = useStore((s) => s.updateModalContent);

  const handleStartNewGame = () => {
    updateModalContent(<DifficultySelectModal />);
  };

  return (
    <div className="game-result">
      <h2 className="game-result__message">You {result}!</h2>
      <p className="game-result__time">Time: {formatTime(elapsedTimeSeconds)}</p>
      <button
        className="game-result__button"
        onClick={handleStartNewGame}
      >
        Start a New Game
      </button>
    </div>
  );
};

export default GameResult;
