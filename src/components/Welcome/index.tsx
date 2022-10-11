import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  DailyChallengeCard,
  DifficultySelectModal,
  GameResultModal,
  Logo,
  Modal,
  WelcomeToolbar,
} from "@/components";
import useStore from "@/store";
import { formatTime, toTitleCase } from "@/utils";
import { useState } from "react";

export default function Welcome() {
  const [shouldShowModal, setShouldShowModal] = useState(false);
  const navigate = useNavigate();
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const result = useStore((s) => s.result);
  const resumeGame = useStore((s) => s.resumeGame);
  const difficulty = useStore((s) => s.difficulty);

  const handleStartNewGame = () => {
    setShouldShowModal(true);
  };

  const handleCloseModal = () => {
    setShouldShowModal(false);
  };

  const handleContinueGame = () => {
    resumeGame();
    navigate("/game");
  };

  const shouldShowContinueButton = elapsedTimeSeconds > 0 && !result;
  const shouldShowGameResultModal = shouldShowModal && Boolean(result);
  const shouldShowDifficltySelectModal = shouldShowModal && !Boolean(result);

  return (
    <div
      className="welcome"
      id="welcome"
    >
      <DailyChallengeCard />
      <header className="welcome__header">
        <Logo />
        <span className="welcome__subtitle">
          by{" "}
          <a
            href="https://github.com/sprioleau"
            target="_blank"
          >
            @sprioleau
          </a>
        </span>
      </header>
      <div className="welcome__buttons">
        {shouldShowContinueButton && (
          <button
            className="welcome__button"
            onClick={handleContinueGame}
            autoFocus
          >
            Continue Game{" "}
            <span className="welcome__button-secondary text-muted">
              <BiTimeFive />
              &nbsp;{formatTime(elapsedTimeSeconds)} - {toTitleCase(difficulty)}
            </span>
          </button>
        )}
        <button
          className="welcome__button ghost"
          onClick={handleStartNewGame}
        >
          New Game
        </button>
      </div>
      <WelcomeToolbar />
      <Modal
        isVisible={shouldShowGameResultModal}
        onClose={handleCloseModal}
      >
        <GameResultModal />
      </Modal>
      <Modal
        isVisible={shouldShowDifficltySelectModal}
        onClose={handleCloseModal}
      >
        <DifficultySelectModal />
      </Modal>
    </div>
  );
}
