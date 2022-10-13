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
      <header className="difficulty-select__header">
        <h2 className="difficulty-select__title">New Game</h2>
        <span className="difficulty-select__subtitle">Select difficulty</span>
      </header>
      <main className="difficulty-select__main">
        <ol className="difficulty-select__buttons-list">
          {Object.keys(EDifficulty).map((difficulty) => (
            <li className="difficulty-select__buttons-list-item">
              <button
                key={difficulty}
                className="difficulty-select__button"
                onClick={() => handleDifficultySelect(difficulty)}
              >
                {toTitleCase(difficulty)}
              </button>
            </li>
          ))}
        </ol>
      </main>
    </div>
  );
}