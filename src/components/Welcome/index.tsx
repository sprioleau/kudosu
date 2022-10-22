import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import {
  ClearPersistedStateButton,
  DailyChallengeCard,
  DifficultySelectModal,
  Layout,
  Logo,
  Modal,
  OptionsButton,
  WelcomeToolbar,
} from "@/components";
import useGameStore from "@/store";
import { formatTime, toTitleCase } from "@/utils";
import { useState } from "react";

export default function Welcome() {
  const [shouldShowDifficultySelectModal, setShouldShowDifficultySelectModal] = useState(false);
  const navigate = useNavigate();
  const elapsedTimeSeconds = useGameStore((s) => s.elapsedTimeSeconds);
  const result = useGameStore((s) => s.result);
  const resumeGame = useGameStore((s) => s.resumeGame);
  const difficulty = useGameStore((s) => s.difficulty);

  const handleShowDifficultySelectModal = () => {
    setShouldShowDifficultySelectModal(true);
  };

  const handleCloseModal = () => {
    setShouldShowDifficultySelectModal(false);
  };

  const handleContinueGame = () => {
    resumeGame();
    navigate("/game");
  };

  const shouldShowContinueButton = elapsedTimeSeconds > 0 && !result;

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
          onClick={handleShowDifficultySelectModal}
        >
          New Game
        </button>
      </div>
      <Modal
        isVisible={shouldShowDifficultySelectModal}
        onClose={handleCloseModal}
      >
        <DifficultySelectModal />
      </Modal>
      <ClearPersistedStateButton />
    </Layout>
  );
}
