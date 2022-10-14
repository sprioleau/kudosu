import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  DailyChallengeCard,
  DifficultySelectModal,
  GameResultModal,
  Layout,
  Logo,
  Modal,
  OptionsButton,
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
    <Layout
      headerContent={{ right: <OptionsButton /> }}
      footerContent={<WelcomeToolbar />}
      parentClassName="welcome"
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
            className="welcome__button rounded-full"
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
          className="welcome__button ghost rounded-full"
          onClick={handleStartNewGame}
        >
          New Game
        </button>
      </div>
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
    </Layout>
  );
}
