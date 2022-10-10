import useStore, { EDifficulty } from "@/store";
import { toTitleCase } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function DifficultySelectModal() {
  const createBoard = useStore((s) => s.createBoard);
  const timerResetFunction = useStore((s) => s.timerResetFunction);
  const resetGame = useStore((s) => s.resetGame);
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: string) => {
    resetGame();
    createBoard(EDifficulty[difficulty as EDifficulty], () => {
      if (timerResetFunction) timerResetFunction();
      navigate("/game")
    });
  }

  return (
    <div className="difficulty-select">
      <h2 className="difficulty-select__title">Select Difficulty</h2>
      <div
        className="difficulty-select__buttons"
        placeholder="Select Difficulty"
      >
        {Object.keys(EDifficulty).map((difficulty) => (
          <button
            key={difficulty}
            className="difficulty-select__button"
            onClick={() => handleDifficultySelect(difficulty)}
          >
            {toTitleCase(difficulty)}
          </button>
        ))}
      </div>
    </div>
  );
}