import useGameStore from "@/store";
import { formatTime } from "@/utils";
import { DifficultySelectModal, Modal } from "@/components";
import { useState } from "react";

const GameResultModal = () => {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const result = useGameStore((s) => s.result);
  const elapsedTimeSeconds = useGameStore((s) => s.elapsedTimeSeconds);

  const handleStartNewGame = () => {
    setShouldShowModal(true);
  };

  const handleCloseModal = () => {
    setShouldShowModal(false);
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
      <Modal
        isVisible={shouldShowModal}
        onClose={handleCloseModal}
      >
        <DifficultySelectModal />
      </Modal>
    </div>
  );
};

export default GameResultModal;
