import useGameStore, { EDifficulty } from "@/store";
import { toTitleCase } from "@/utils";
import { useNavigate } from "react-router-dom";

export default function DifficultySelectModal() {
  const createBoard = useGameStore((s) => s.createBoard);
  const navigate = useNavigate();

  const handleDifficultySelect = (difficulty: string) => {
    createBoard({
      difficulty: EDifficulty[difficulty as EDifficulty],
      onBoardCreated: () => navigate("/game"),
    });
  };

  return (
    <div className="difficulty-select">
      <header className="difficulty-select__header">
        <h2 className="difficulty-select__title">New Game</h2>
        <span className="difficulty-select__subtitle">Select difficulty</span>
      </header>
      <main className="difficulty-select__main">
        <ol className="difficulty-select__buttons-list">
          {Object.keys(EDifficulty).map((difficulty) => (
            <li
              key={difficulty}
              className="difficulty-select__buttons-list-item"
            >
              <button
                className="difficulty-select__button rounded-full"
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
