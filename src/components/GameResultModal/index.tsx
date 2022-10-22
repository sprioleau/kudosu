import useGameStore from "@/store";
import { formatTime } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function GameResultModal() {
  const result = useGameStore((s) => s.result);
  const elapsedTimeSeconds = useGameStore((s) => s.elapsedTimeSeconds);
  const navigate = useNavigate();

  const handleCloseModal = () => navigate("/");

  return (
    <div className="game-result">
      <h2 className="game-result__message">You {result}!</h2>
      <p className="game-result__time">Time: {formatTime(elapsedTimeSeconds)}</p>
      <button
        className="game-result__button"
        onClick={handleCloseModal}
      >
        Start a New Game
      </button>
    </div>
  );
};