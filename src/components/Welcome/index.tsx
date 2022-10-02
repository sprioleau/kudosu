import { BiTimeFive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { DailyChallengeCard, DifficultySelectModal, Logo } from "@/components";
import useStore from "@/store";
import { formatTime, toTitleCase } from "@/utils";

export default function Welcome() {
  const navigate = useNavigate();
  const updateModalContent = useStore((s) => s.updateModalContent);
  const elapsedTimeSeconds = useStore((s) => s.elapsedTimeSeconds);
  const result = useStore((s) => s.result);
  const resumeGame = useStore((s) => s.resumeGame);
  const difficulty = useStore((s) => s.difficulty);

  const handleStartNewGame = () => {
    updateModalContent(<DifficultySelectModal />)
  };
  
  const handleContinueGame = () => {
    resumeGame();
    navigate("/game");
  }

  const shouldShowContinueButton = elapsedTimeSeconds > 0 && !result;
  
  return (
    <div className="welcome">
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
          <button className="welcome__button" onClick={handleContinueGame}>
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
    </div>
  );
}
